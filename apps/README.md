# Application Surfaces

`apps/` is a collection of application roots. Each direct child is one selected language/architecture surface, not a generic source directory.

- [sdkwork-recruitment-pc](apps/sdkwork-recruitment-pc/) — PC: Large-screen browser and desktop renderer.
- [sdkwork-recruitment-h5](apps/sdkwork-recruitment-h5/) — H5: Phone-first mobile browser renderer.

## Rules

- Keep each app shell thin: bootstrap, providers, route assembly, layout, and dependency construction only.
- Business screens, services, state, and workflow components belong in packages under the owning app root.
- PC and H5 are separate architecture roots. They may share generated SDKs and service ports but must not import each other's UI.
- Every generated app root carries `specs/component.spec.json`, `.sdkwork/`, and `AGENTS.md`.

See `../sdkwork-specs/APPLICATION_SPEC.md` and `../sdkwork-specs/APP_CLIENT_ARCHITECTURE_ALIGNMENT_SPEC.md`.
