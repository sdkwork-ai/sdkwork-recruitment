# SDKWork Recruitment Technical Architecture

Status: draft
Owner: sdkwork-platform
Updated: 2026-11-03
Specs: ARCHITECTURE_DECISION_SPEC.md, DOCUMENTATION_SPEC.md

## Document Map

- Add `TECH-<topic>.md` shards in this directory when the architecture grows beyond one reviewable screen.

## 1. Architecture Overview

`sdkwork-recruitment` is initialized as an SDKWork application with 8 architecture root(s): pc, h5, pad, ios, android, harmony, flutter, mini-program.

The app shells are thin composition roots. Business behavior, service ports, generated SDK clients, and route contributions are added later under the owning architecture standard. 10 common component(s) are selected and resolved per architecture: iam, appbase, rtc, im, agents, order, drive, payment, comments, messaging.

## 2. Technology Choices

| Concern | Choice |
| --- | --- |
| Languages | Per-architecture: TypeScript, Dart, Swift, Kotlin, ArkTS |
| UI | React 19, Flutter, SwiftUI, Jetpack Compose, ArkUI, native mini-program |
| Build | Vite, Flutter, Xcode, Gradle, hvigor, mini-program tooling |
| Package manager | pnpm workspace plus native package managers |
| Architectures | pc, h5, pad, ios, android, harmony, flutter, mini-program |
| Components | iam, appbase, rtc, im, agents, order, drive, payment, comments, messaging |
| Local verification | `pnpm check`, `pnpm test`, `pnpm build` |

### 2.1 Visual Baseline

The generated client surfaces use the tech-blue SDKWork Doctor visual baseline:

| Token | Value | Role |
| --- | --- | --- |
| Canvas | `#f2f5fa` | Page background |
| Surface | `#ffffff` | Cards and panels |
| Surface alt | `#e6edf8` | Nested rows and stat tiles |
| Chrome navy | `#061a3a` | PC rail / H5 app bar / navigation chrome |
| Accent | `#0a5cff` | Single saturated action and selection color |
| Accent strong | `#0747c9` | Hover and emphasis text |
| Accent soft | `#e7efff` | Selected/soft action background |
| Ink | `#0a1324` | Primary text |
| Muted | `#5a6b85` | Secondary text |
| Radius | `14px` / `10px` | Panels / nested controls |

Rules:

- Flat and borderless: no card borders, no shadows, no gradients.
- Separation comes from canvas/surface/tonal layers, not strokes.
- One accent family; status uses the shared success/warn/error/skipped tokens.
- PC uses an 88px navy rail; H5, Flutter, and native shells use a compact top bar.
- Flutter mirrors the same tokens in `lib/theme/app_theme.dart`; native shells keep the same color constants in their component registry.

## 3. System Boundaries And Modules

- `apps/sdkwork-recruitment-<surface>/` — application surface roots.
- `apps/sdkwork-recruitment-<surface>/src/` — shell bootstrap, layout, and entry only.
- `apps/sdkwork-recruitment-<surface>/packages/` — add business packages here when the first workflow is implemented.
- `apis/` — API contracts when the application owns HTTP/RPC surfaces.
- `crates/` — Rust route, service, repository, and host crates when a backend is added.
- `sdks/` — generated SDK families. Generated output is generator-owned.
- `etc/` — deployment/runtime profiles.

## 4. Directory And Package Layout

- `pc` — PC: Large-screen browser and desktop renderer.
- `h5` — H5: Phone-first mobile browser renderer.
- `pad` — Pad: Tablet-first React renderer with large-screen tablet behavior.
- `ios` — iOS: Native SwiftUI iOS application shell.
- `android` — Android: Native Kotlin/Compose Android application shell.
- `harmony` — HarmonyOS: Native HarmonyOS ArkTS/ArkUI application shell.
- `flutter` — Flutter: Flutter mobile application shell.
- `mini-program` — Mini Program: WeChat mini-program TypeScript source shell.

## 5. API, SDK, And Data Ownership

Selected common components are resolved from sibling `sdk-manifest.json` files. `specs/components.selected.json` records the resolved SDK package and path for each architecture. Web/tablet roots consume TypeScript app SDKs through `src/composition/sdkClients.ts`; Flutter roots use Dart/Flutter path dependencies; native roots carry a generated component registry and an SDK integration plan until their native package manager is wired.

The application still owns no API authority at scaffold time. Product APIs and generated application SDKs are added after requirements are captured. Before adding one:

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

The scaffold currently builds static web/tablet artifacts under `apps/*/dist/<deployment-profile>/<environment>/`; native roots are packaged by Xcode, Gradle, hvigor, Flutter, and WeChat tooling. No server runtime or container is defined. Add `specs/topology.spec.json`, `etc/topology/`, and deployment descriptors before introducing a deployable API runtime.

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
