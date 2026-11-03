# sdkwork-recruitment-harmony-mobile

Native HarmonyOS surface root for `sdkwork-recruitment`.

- Architecture: `HARMONY_APP_MOBILE_ARCHITECTURE_SPEC.md`
- UI standard: `APP_HARMONY_NATIVE_UI_SPEC.md`
- Bundle name: `com.sdkwork.recruitment.mobile`
- Module: `entry`

## Structure

```text
apps/sdkwork-recruitment-harmony-mobile/
  AppScope/app.json5
  entry/src/main/
    module.json5
    ets/entryability/EntryAbility.ets
    ets/pages/Index.ets
    ets/composition/ComponentRegistry.ets
    resources/
  config/components/
  specs/component.spec.json
  build-profile.json5
  oh-package.json5
```

`entry/` stays thin: ability, root page, and composition only. The root uses ArkUI `Tabs` with `BarPosition.End` and `Overview / Surfaces / Components`. Business pages belong in ArkTS packages under `packages/sdkwork-recruitment-harmony-mobile-<capability>/`.

## Commands

```bash
hvigorw assembleHap
hvigorw test
```

Use DevEco Studio for signing, emulator/device deployment, and AppGallery packaging.

## Boundaries

- Do not import React, Flutter, Swift, Kotlin, or mini-program UI.
- Construct generated ArkTS/TypeScript app SDK clients in `ets/bootstrap/`, never in pages.
- Keep distributed capabilities, permissions, push, and secure storage behind host adapters.
- `specs/components.selected.json` is the component dependency map.
