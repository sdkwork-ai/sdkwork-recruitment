# etc

Source-controlled deployment and runtime profiles for `sdkwork-recruitment`.

`etc/` is the concrete environment/runtime configuration authority. The app manifest declares identity only; it must not contain environment domains, ports, SDK Base URLs, bind addresses, database targets, or secrets.

## Current State

The scaffold initializes client surfaces only. Add typed topology profiles here when an API runtime, database, or deployable service is introduced:

- `etc/topology/standalone.{development,test,staging,demo,production}.env`
- `etc/topology/cloud.{development,test,staging,demo,production}.env`
- `etc/sdkwork.deployment.config.json`

These profiles currently carry profile identity plus the platform API gateway edge for the cloud profiles. Add service URLs, bind addresses, database targets, and secret references here when the corresponding runtime is introduced.

Follow `../sdkwork-specs/SOURCE_CONFIG_SPEC.md`, `../sdkwork-specs/CONFIG_SPEC.md`, `../sdkwork-specs/ENVIRONMENT_SPEC.md`, and `../sdkwork-specs/DEPLOYMENT_SPEC.md`.

## Client env materialization

`client-env.materialization.json` declares the repository's public-token
carriers: the PC, H5, and pad Vite surfaces, the Flutter mobile surface, and the
WeChat mini-program surface. `materialize-client-env.mjs` mints the
deploy-anchored application access token per profile into each surface's
carrier file:

| Surface format | Carrier file |
| --- | --- |
| Vite (PC / H5 / pad) | `apps/<surface>/.env.<deployment-profile>.<environment>` |
| Flutter | `apps/sdkwork-recruitment-flutter-mobile/env/sdkwork.<profile>.json` |
| WeChat mini program | `apps/sdkwork-recruitment-mini-program/config/mini-program/runtime-env.<profile>.json` |

The token's `app_id`/`aud` comes from `SDKWORK_DEPLOY_APPLICATION_ID`, never from
a compiled-in literal (`APP_ACCESS_TOKEN_SPEC.md` §3.1.1): the deploy anchor is
owned by the installation, and the registrar writes it into the authored
topology override layer before re-running the materializer. Materialize or
verify the committed profiles with:

```sh
SDKWORK_DEPLOY_APPLICATION_ID=__SDKWORK_DEPLOY_APPLICATION_ID__ \
  node ../sdkwork-specs/tools/materialize-client-env.mjs --root . [--check]
```

The token carries the minimal `iam:self` bootstrap scope, matching
`backend.accessTokenPermissionScope` in `agent.app.config.json`.

Native roots own no runtime env carrier yet: the Android (Kotlin) and iOS
(Swift) shells have no `config/app/runtime-env.<profile>.json` document, and the
HarmonyOS shell has no authored runtime template. They are therefore not
declared in `client-env.materialization.json` until each root gains one.

## Rules

- Never commit secrets. Commit secret-file references only.
- Keep environment values out of `agent.app.config.json`.
- Use profile ids `<deployment-profile>.<environment>` with `standalone|cloud` and `development|test|staging|demo|production`.
