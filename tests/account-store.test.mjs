import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import {
  IAM_ACCOUNT_STORAGE_KEY,
  IamAccountStore,
  readIamAccountIdentity,
} from '../apps/sdkwork-recruitment-pc/src/account/account-store.ts';

const originalWindow = globalThis.window;
const originalBroadcastChannel = globalThis.BroadcastChannel;

class FakeBroadcastChannel {
  static instances = [];

  constructor(name) {
    this.name = name;
    this.listeners = new Set();
    this.posted = [];
    FakeBroadcastChannel.instances.push(this);
  }

  addEventListener(type, listener) {
    if (type === 'message') this.listeners.add(listener);
  }

  removeEventListener(type, listener) {
    this.listeners.delete(listener);
  }

  postMessage(data) {
    this.posted.push(data);
  }

  close() {
    this.closed = true;
  }

  emit(data) {
    for (const listener of this.listeners) listener({ data });
  }
}

function createWindowStub() {
  const storage = new Map();
  const listeners = new Map();
  return {
    localStorage: {
      getItem: (key) => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => {
        storage.set(key, String(value));
      },
      removeItem: (key) => {
        storage.delete(key);
      },
    },
    addEventListener: (type, listener) => {
      const set = listeners.get(type) ?? new Set();
      set.add(listener);
      listeners.set(type, set);
    },
    removeEventListener: (type, listener) => {
      listeners.get(type)?.delete(listener);
    },
    dispatchStorage: (key, newValue) => {
      for (const listener of listeners.get('storage') ?? []) {
        listener({ key, newValue });
      }
    },
  };
}

function account(userId, tenantId, overrides = {}) {
  return {
    status: 'authenticated',
    profile: {
      id: userId,
      tenantId,
      displayName: `${userId}-name`,
      email: `${userId}@example.com`,
      ...overrides,
    },
  };
}

function envelope(snapshot, userId, tenantId) {
  return {
    snapshot,
    at: Date.now(),
    ...(userId ? { userId } : {}),
    ...(tenantId ? { tenantId } : {}),
  };
}

function latestChannel() {
  return FakeBroadcastChannel.instances[FakeBroadcastChannel.instances.length - 1];
}

beforeEach(() => {
  FakeBroadcastChannel.instances = [];
  globalThis.BroadcastChannel = FakeBroadcastChannel;
  globalThis.window = createWindowStub();
});

afterEach(() => {
  globalThis.window = originalWindow;
  globalThis.BroadcastChannel = originalBroadcastChannel;
});

describe('IamAccountStore snapshot lifecycle', () => {
  it('persists the authenticated identity and removes the snapshot on sign-out', () => {
    const store = new IamAccountStore();
    const emitted = [];
    store.subscribe((snapshot) => emitted.push(snapshot));

    store.publish(account('user-a', 'tenant-1'));
    const persisted = JSON.parse(globalThis.window.localStorage.getItem(IAM_ACCOUNT_STORAGE_KEY));
    assert.equal(persisted.userId, 'user-a');
    assert.equal(persisted.tenantId, 'tenant-1');
    assert.equal(persisted.snapshot.profile.email, 'user-a@example.com');

    emitted.length = 0;
    store.clear();

    assert.equal(globalThis.window.localStorage.getItem(IAM_ACCOUNT_STORAGE_KEY), null);
    assert.deepEqual(emitted, [{ status: 'anonymous' }]);
  });

  it('reads the identity only from complete authenticated snapshots', () => {
    assert.deepEqual(readIamAccountIdentity(account('user-a', 'tenant-1')), {
      userId: 'user-a',
      tenantId: 'tenant-1',
    });
    assert.equal(readIamAccountIdentity({ status: 'anonymous' }), null);
    assert.equal(
      readIamAccountIdentity({ status: 'authenticated', profile: { id: 'user-a' } }),
      null,
    );
  });

  it('emits a storage envelope only when its identity matches the current session', () => {
    const store = new IamAccountStore();
    const emitted = [];
    store.subscribe((snapshot) => emitted.push(snapshot));
    store.publish(account('user-a', 'tenant-1'));
    emitted.length = 0;

    globalThis.window.dispatchStorage(
      IAM_ACCOUNT_STORAGE_KEY,
      JSON.stringify(envelope(account('user-b', 'tenant-1'), 'user-b', 'tenant-1')),
    );
    assert.equal(emitted.length, 0, 'another user must be rejected');

    globalThis.window.dispatchStorage(
      IAM_ACCOUNT_STORAGE_KEY,
      JSON.stringify(envelope(account('user-a', 'tenant-2'), 'user-a', 'tenant-2')),
    );
    assert.equal(emitted.length, 0, 'another tenant must be rejected');

    globalThis.window.dispatchStorage(
      IAM_ACCOUNT_STORAGE_KEY,
      JSON.stringify({ snapshot: account('user-b', 'tenant-1'), at: Date.now() }),
    );
    assert.equal(emitted.length, 0, 'an envelope without identity must be rejected');

    globalThis.window.dispatchStorage(
      IAM_ACCOUNT_STORAGE_KEY,
      JSON.stringify(
        envelope(account('user-a', 'tenant-1', { displayName: 'Alice Updated' }), 'user-a', 'tenant-1'),
      ),
    );
    assert.equal(emitted.length, 1);
    assert.equal(emitted[0].profile.displayName, 'Alice Updated');
  });

  it('emits a BroadcastChannel envelope only from the current account', () => {
    const store = new IamAccountStore();
    const channel = latestChannel();
    const emitted = [];
    store.subscribe((snapshot) => emitted.push(snapshot));
    store.publish(account('user-a', 'tenant-1'));
    emitted.length = 0;

    channel.emit(envelope(account('user-b', 'tenant-1'), 'user-b', 'tenant-1'));
    assert.equal(emitted.length, 0);

    channel.emit(envelope(account('user-a', 'tenant-1'), 'user-a', 'tenant-1'));
    assert.equal(emitted.length, 1);
    assert.equal(emitted[0].profile.id, 'user-a');
  });

  it('clears a peer tab only when the sign-out envelope belongs to its account', () => {
    const store = new IamAccountStore();
    const channel = latestChannel();
    const emitted = [];
    store.subscribe((snapshot) => emitted.push(snapshot));
    store.publish(account('user-a', 'tenant-1'));
    emitted.length = 0;

    channel.emit({
      snapshot: { status: 'anonymous' },
      at: Date.now(),
      userId: 'user-b',
      tenantId: 'tenant-1',
    });
    assert.equal(emitted.length, 0);

    channel.emit({
      snapshot: { status: 'anonymous' },
      at: Date.now(),
      userId: 'user-a',
      tenantId: 'tenant-1',
    });
    assert.equal(emitted.length, 1);
    assert.deepEqual(emitted[0], { status: 'anonymous' });
  });

  it('ignores account envelopes while this tab has no current session', () => {
    const store = new IamAccountStore();
    const channel = latestChannel();
    const emitted = [];
    store.subscribe((snapshot) => emitted.push(snapshot));

    channel.emit(envelope(account('user-a', 'tenant-1'), 'user-a', 'tenant-1'));
    assert.equal(emitted.length, 0);
  });
});
