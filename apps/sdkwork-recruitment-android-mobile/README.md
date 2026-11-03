# sdkwork-recruitment-android-mobile

Native Android surface root for `sdkwork-recruitment`.

- Architecture: `ANDROID_APP_MOBILE_ARCHITECTURE_SPEC.md`
- UI standard: `APP_ANDROID_NATIVE_UI_SPEC.md`
- Namespace: `com.sdkwork.recruitment.android.mobile`
- Min SDK: 26

## Structure

```text
apps/sdkwork-recruitment-android-mobile/
  app/
    build.gradle.kts
    src/main/AndroidManifest.xml
    src/main/kotlin/com/sdkwork/recruitment/android/mobile/
      MainApplication.kt
      MainActivity.kt
      bootstrap/ComponentRegistry.kt
  config/components/
  specs/component.spec.json
  build.gradle.kts
  settings.gradle.kts
```

`app/` stays thin: application, activity, composition, and bootstrap only. Business screens belong in Android library modules under `packages/sdkwork-recruitment-android-mobile-<capability>/`.

## Commands

```bash
gradle :app:assembleDebug
gradle :app:testDebugUnitTest
```

A Gradle wrapper can be added from the developer machine; generated source contains no credentials or signing material.

## Boundaries

- Do not import React, Flutter, Swift, ArkTS, or mini-program UI.
- Construct generated Kotlin/Java app SDK clients in `bootstrap/`, never in composables.
- Keep Play Services, camera, secure storage, push, and deep links behind host adapters.
- Use `specs/components.selected.json` as the component dependency map.
