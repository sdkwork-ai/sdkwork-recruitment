# crates

Rust crates for backend routes, services, repositories, runtime hosts, workers, and reusable libraries.

No Rust workspace exists at scaffold time. When a backend is introduced, add a root `Cargo.toml` and place crates here using the canonical names:

```text
crates/
  sdkwork-routes-<capability>-app-api/
  sdkwork-routes-<capability>-open-api/
  sdkwork-routes-<capability>-backend-api/
  sdkwork-<domain>-<capability>-service/
  sdkwork-<domain>-<capability>-repository-sqlx/
  sdkwork-<application-code>-service-host/
```

Follow `../sdkwork-specs/RUST_CODE_SPEC.md`, `../sdkwork-specs/WEB_BACKEND_SPEC.md`, `../sdkwork-specs/WEB_FRAMEWORK_SPEC.md`, and `../sdkwork-specs/API_ASSEMBLY_SPEC.md`.
