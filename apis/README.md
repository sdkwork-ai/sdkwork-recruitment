# apis

Author-owned API contracts and materialization inputs.

This directory is intentionally empty at scaffold time. When the application owns HTTP, RPC, or event contracts, add them here by surface:

```text
apis/
  open-api/<domain>/
  app-api/<domain>/
  backend-api/<domain>/
  rpc/
  async/
```

Generated SDK families belong under `sdks/`, never here. Follow `../sdkwork-specs/API_SPEC.md`, `../sdkwork-specs/RPC_SPEC.md`, `../sdkwork-specs/SDK_WORKSPACE_GENERATION_SPEC.md`, and `../sdkwork-specs/WEB_FRAMEWORK_SPEC.md`.
