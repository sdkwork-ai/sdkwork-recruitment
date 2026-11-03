import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP_CODE = 'recruitment';
const APP_TYPE = 'APP_REACT';
const EXPECTED_ARCHITECTURES = ["pc","h5","pad","ios","android","harmony","flutter","mini-program"];
const ARCHITECTURE_ROOTS = [{"id":"pc","suffix":"pc","root":"apps/sdkwork-recruitment-pc","packageName":"sdkwork-recruitment-pc","kind":"web"},{"id":"h5","suffix":"h5","root":"apps/sdkwork-recruitment-h5","packageName":"sdkwork-recruitment-h5","kind":"web"},{"id":"pad","suffix":"pad","root":"apps/sdkwork-recruitment-pad","packageName":"sdkwork-recruitment-pad","kind":"web"},{"id":"ios","suffix":"ios-mobile","root":"apps/sdkwork-recruitment-ios-mobile","packageName":"sdkwork-recruitment-ios-mobile","kind":"ios"},{"id":"android","suffix":"android-mobile","root":"apps/sdkwork-recruitment-android-mobile","packageName":"sdkwork-recruitment-android-mobile","kind":"android"},{"id":"harmony","suffix":"harmony-mobile","root":"apps/sdkwork-recruitment-harmony-mobile","packageName":"sdkwork-recruitment-harmony-mobile","kind":"harmony"},{"id":"flutter","suffix":"flutter-mobile","root":"apps/sdkwork-recruitment-flutter-mobile","packageName":"sdkwork-recruitment-flutter-mobile","kind":"flutter"},{"id":"mini-program","suffix":"mini-program","root":"apps/sdkwork-recruitment-mini-program","packageName":"sdkwork-recruitment-mini-program","kind":"mini-program"}];
const EXPECTED_COMPONENTS = ["iam","appbase","rtc","im","agents","order","drive","payment","comments","messaging"];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8').replace(/^\uFEFF/u, ''));
}

test('repository declares the SDKWork application identity', () => {
  const manifest = readJson('agent.app.config.json');
  assert.equal(manifest.schemaVersion, 3);
  assert.equal(manifest.kind, 'agent.app');
  assert.equal(manifest.app.key, `sdkwork-${APP_CODE}`);
  assert.equal(manifest.app.appType, APP_TYPE);
  assert.deepEqual(manifest.metadata.scaffold.architectures, EXPECTED_ARCHITECTURES);
  assert.deepEqual(manifest.metadata.scaffold.components, EXPECTED_COMPONENTS);
  assert.equal(manifest.metadata.deploymentConfig, 'etc/sdkwork.deployment.config.json');
});

test('README declares an application repository', () => {
  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  assert.match(readme, /^repository-kind: application$/mu);
});

test('all generated architecture roots are registered pnpm workspace packages', () => {
  const workspace = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf8');
  assert.match(workspace, /apps\/\*/u);
  for (const architecture of ARCHITECTURE_ROOTS) {
    const appRoot = path.join(ROOT, architecture.root);
    const manifest = JSON.parse(fs.readFileSync(path.join(appRoot, 'package.json'), 'utf8'));
    assert.equal(manifest.name, architecture.packageName);
    assert.ok(fs.existsSync(path.join(appRoot, 'specs', 'component.spec.json')));
    assert.ok(fs.existsSync(path.join(appRoot, 'AGENTS.md')));
  }
});

test('component selection resolves into app-level configuration', () => {
  const selection = readJson('specs/components.selected.json');
  assert.deepEqual(selection.architectures, EXPECTED_ARCHITECTURES);
  assert.deepEqual(selection.components.map((component) => component.id), EXPECTED_COMPONENTS);
  for (const architecture of ARCHITECTURE_ROOTS) {
    for (const componentId of EXPECTED_COMPONENTS) {
      const configPath = path.join(ROOT, architecture.root, 'config', 'components', `${componentId}.json`);
      assert.ok(fs.existsSync(configPath), `missing ${configPath}`);
    }
  }
});

test('standard root command surface is complete', () => {
  const manifest = readJson('package.json');
  for (const script of [
    'dev',
    'dev:standalone',
    'dev:cloud',
    'stop',
    'build',
    'test',
    'check',
    'verify',
    'clean',
    'api:assembly:materialize',
    'api:assembly:validate',
  ]) {
    assert.equal(typeof manifest.scripts[script], 'string', `missing script ${script}`);
  }
  assert.equal(manifest.scripts.dev, 'pnpm dev:standalone');
});

test('Canon documentation exists', () => {
  for (const relativePath of [
    'docs/README.md',
    'docs/product/prd/PRD.md',
    'docs/architecture/tech/TECH_ARCHITECTURE.md',
    'docs/INDEX.yaml',
    'docs/components/README.md',
    'specs/component.spec.json',
  ]) {
    assert.ok(fs.existsSync(path.join(ROOT, relativePath)), `missing ${relativePath}`);
  }
});
