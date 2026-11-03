# sdks

SDK family workspaces, OpenAPI authorities, derived generator inputs, and generated SDK output.

No SDK family is generated at scaffold time. When the application owns APIs, create SDK family directories here:

```text
sdks/
  sdkwork-<domain>-sdk/
  sdkwork-<domain>-app-sdk/
  sdkwork-<domain>-backend-sdk/
```

Generated output is owned by `../sdkwork-sdk-generator/bin/sdkgen.js` (`@sdkwork/sdk-generator`). Do not hand-edit it; fix the generation chain and regenerate.

Follow `../sdkwork-specs/SDK_SPEC.md`, `../sdkwork-specs/SDK_WORKSPACE_GENERATION_SPEC.md`, and `../sdkwork-specs/SDK_PACKAGE_NAMING_SPEC.md`.
