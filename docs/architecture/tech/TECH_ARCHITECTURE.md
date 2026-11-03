# SDKWork Recruitment Technical Architecture

Status: draft
Owner: sdkwork-platform
Updated: 2026-11-03
Specs: ARCHITECTURE_DECISION_SPEC.md, DOCUMENTATION_SPEC.md

## Document Map

- Add `TECH-<topic>.md` shards in this directory when the architecture grows beyond one reviewable screen.

## 1. Architecture Overview

`sdkwork-recruitment` is initialized as an SDKWork application with 2 browser surface(s): pc, h5.

The app shells are thin React/Vite composition roots. Business behavior, service ports, generated SDK clients, and route contributions are added later under the owning architecture standard.

## 2. Technology Choices

| Concern | Choice |
| --- | --- |
| Language | TypeScript, strict mode |
| UI | React 19 |
| Build | Vite |
| Package manager | pnpm workspace |
| Browser surfaces | pc, h5 |
| Local verification | `pnpm check`, `pnpm test`, `pnpm build` |

## 3. System Boundaries And Modules

- `apps/sdkwork-recruitment-<surface>/` — application surface roots.
- `apps/sdkwork-recruitment-<surface>/src/` — shell bootstrap, layout, and entry only.
- `apps/sdkwork-recruitment-<surface>/packages/` — add business packages here when the first workflow is implemented.
- `apis/` — API contracts when the application owns HTTP/RPC surfaces.
- `crates/` — Rust route, service, repository, and host crates when a backend is added.
- `sdks/` — generated SDK families. Generated output is generator-owned.
- `etc/` — deployment/runtime profiles.

## 4. Directory And Package Layout

- [sdkwork-recruitment-pc](apps/sdkwork-recruitment-pc/) — PC: Large-screen browser and desktop renderer.
- [sdkwork-recruitment-h5](apps/sdkwork-recruitment-h5/) — H5: Phone-first mobile browser renderer.

## 5. API, SDK, And Data Ownership

No API authority or generated SDK is owned at scaffold time. Before adding one:

1. Capture the requirement and architecture decision.
2. Define the API contract under `apis/`.
3. Add the route crate or controller and materialize the authority OpenAPI.
4. Generate the SDK family under `sdks/` with the canonical `sdkgen` pipeline.
5. Wire the generated client through app bootstrap and a service port.

Follow `../sdkwork-specs/API_SPEC.md`, `../sdkwork-specs/SDK_SPEC.md`, and `../sdkwork-specs/SDK_WORKSPACE_GENERATION_SPEC.md`.

## 6. Security, Privacy, And Observability

- Do not commit secrets or concrete environment values.
- Authenticated flows must use appbase IAM runtime and a single global TokenManager when login is added.
- Treat all user content as private by default and record data residency constraints before deployment.
- Add structured logs, metrics, and traces with the first runtime service.

Follow `../sdkwork-specs/SECURITY_SPEC.md`, `../sdkwork-specs/PRIVACY_SPEC.md`, and `../sdkwork-specs/OBSERVABILITY_SPEC.md`.

## 7. Deployment And Runtime Topology

The scaffold currently builds static browser artifacts under `apps/*/dist/<deployment-profile>/<environment>/`. No server runtime or container is defined. Add `specs/topology.spec.json`, `etc/topology/`, and deployment descriptors before introducing a deployable API runtime.

Follow `../sdkwork-specs/APP_RUNTIME_TOPOLOGY_SPEC.md` and `../sdkwork-specs/DEPLOYMENT_SPEC.md`.

## 8. Architecture Decision Index

No ADR is recorded at scaffold time. Add `ADR-*` records under `docs/architecture/decisions/` when a durable boundary or technology choice is made.

## 9. Verification

```bash
pnpm check
pnpm test
pnpm build
node ../sdkwork-specs/tools/audit-repository-baseline.mjs --root .
node ../sdkwork-specs/tools/check-workspace-layout.mjs --root .
```
