# sdkwork-recruitment-ios-mobile

Native iOS surface root for `sdkwork-recruitment`.

- Architecture: `IOS_APP_MOBILE_ARCHITECTURE_SPEC.md`
- UI standard: `APP_IOS_NATIVE_UI_SPEC.md`
- Swift module: `SdkworkRecruitmentIosMobile`
- Bundle id: `com.sdkwork.recruitment`

## Structure

```text
apps/sdkwork-recruitment-ios-mobile/
  App/
    App.swift
    ContentView.swift
    Bootstrap/ComponentRegistry.swift
    Resources/Info.plist
  Tests/
  config/components/
  specs/component.spec.json
  Package.swift
  project.yml
```

`App/` is the thin installable target. Feature views, services, and state belong in Swift packages under `packages/sdkwork-recruitment-ios-mobile-<capability>/`.

## Commands

```bash
swift build
swift test
xcodegen generate   # when XcodeGen is available
```

Open the generated project in Xcode for simulator/device builds. Signing references belong in `config/host/` and must not contain private keys.

## Boundaries

- Do not import React, Flutter, Kotlin, ArkTS, or mini-program UI.
- Construct generated Swift app SDK clients in `App/Bootstrap/`, never in feature views.
- Keep Keychain, push, camera, deep links, and other Apple capabilities behind host adapters.
- Native SDK packages from `specs/components.selected.json` are the only dependency inputs.
