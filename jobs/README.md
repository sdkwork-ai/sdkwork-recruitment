# jobs

Scheduled jobs, queue bindings, batch descriptors, maintenance runbooks, and non-Rust job packages.

No job is defined at scaffold time. Rust worker implementations belong under `crates/sdkwork-<domain>-<capability>-worker/`; this directory owns the schedule, binding, and operational descriptors.

Follow `../sdkwork-specs/EVENT_SPEC.md` and `../sdkwork-specs/OPERATIONS_SPEC.md`.
