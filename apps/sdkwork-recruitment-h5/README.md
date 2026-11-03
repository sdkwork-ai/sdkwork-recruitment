# sdkwork-recruitment-h5

H5 surface root for `sdkwork-recruitment`.

- Architecture: `APP_H5_ARCHITECTURE_SPEC.md`
- UI standard: `APP_MOBILE_REACT_UI_SPEC.md`
- Dev port: `4174`
- Package: `sdkwork-recruitment-h5`

## Structure

```text
apps/sdkwork-recruitment-h5/
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

## Commands

```bash
pnpm --dir apps/sdkwork-recruitment-h5 typecheck
pnpm --dir apps/sdkwork-recruitment-h5 build
pnpm dev        # from the repository root; starts every selected surface
```

## Build Output

`vite build` writes `dist/<deployment-profile>/<environment>/index.html` plus hashed assets. The default is `dist/standalone/prod`.

## Boundaries

- Do not import the other browser surface's UI.
- Do not build raw HTTP calls or manual auth headers; consume generated SDKs through service ports once APIs exist.
- Generated SDK output stays under `sdks/`; never hand-edit it.
- Keep `specs/component.spec.json` aligned with public exports, ports, and runtime entrypoints.

See `../../../sdkwork-specs/APP_H5_ARCHITECTURE_SPEC.md` and `../../../sdkwork-specs/APP_MOBILE_REACT_UI_SPEC.md`.
