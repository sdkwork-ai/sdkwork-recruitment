# sdkwork-recruitment-pc

PC surface root for `sdkwork-recruitment`.

- Architecture: `APP_PC_ARCHITECTURE_SPEC.md`
- UI standard: `APP_PC_REACT_UI_SPEC.md`
- Dev port: `4173`
- Package: `sdkwork-recruitment-pc`

## Structure

```text
apps/sdkwork-recruitment-pc/
  index.html
  package.json
  specs/
    component.spec.json
  src/
    App.tsx
    main.tsx
    index.css
    vite-env.d.ts
  tsconfig.json
  vite.config.ts
```

`src/` is the shell composition boundary. Add business pages, services, state, and workflow components under `packages/` when the first workflow is implemented. Do not grow business behavior in `App.tsx`.

`src/composition/components.ts` is the generated component registry. `src/composition/sdkClients.ts` constructs the selected TypeScript app SDK clients with one shared base URL and token manager. Per-component settings live in `config/components/<id>.json`.

## Commands

```bash
pnpm --dir apps/sdkwork-recruitment-pc typecheck
pnpm --dir apps/sdkwork-recruitment-pc build
pnpm dev        # from the repository root; starts every selected surface
```

## Build Output

`vite build` writes `dist/<deployment-profile>/<environment>/index.html` plus hashed assets. The default is `dist/standalone/prod`.

## Boundaries

- Do not import another architecture's UI or host implementation.
- Do not build raw HTTP calls or manual auth headers; consume generated SDKs through `src/composition/sdkClients.ts` and service ports.
- Do not add a second SDK inventory outside the generated composition registry.
- Generated SDK output stays under `sdks/`; never hand-edit it.
- Keep `specs/component.spec.json` aligned with public exports, ports, and runtime entrypoints.

See `../../../sdkwork-specs/APP_PC_ARCHITECTURE_SPEC.md` and `../../../sdkwork-specs/APP_PC_REACT_UI_SPEC.md`.
