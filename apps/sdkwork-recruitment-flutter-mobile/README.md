# sdkwork-recruitment-flutter-mobile

Flutter mobile surface root for `sdkwork-recruitment`.

- Architecture: `FLUTTER_APP_MOBILE_ARCHITECTURE_SPEC.md`
- UI standard: `APP_FLUTTER_UI_SPEC.md`
- Dart package: `sdkwork_recruitment_flutter_mobile`
- Platform output: iOS and Android Flutter targets

## Structure

```text
apps/sdkwork-recruitment-flutter-mobile/
  lib/
    main.dart
    app.dart
    theme/
      app_theme.dart
    composition/
      architecture_registry.dart
      component_registry.dart
  test/
  config/components/
  specs/component.spec.json
  pubspec.yaml
```

`lib/` stays thin: app entry, root shell, component registry, and bootstrap wiring. The shell uses a Material 3 bottom `NavigationBar` with `Overview / Surfaces / Components / Me`. Feature screens belong in `packages/sdkwork_recruitment_flutter_mobile-<capability>/`.

## Commands

```bash
flutter pub get
flutter analyze
flutter test
```

Generated Dart/Flutter SDK dependencies are appended to `pubspec.yaml` from the selected component registry.

## Boundaries

- Do not import React or native platform UI packages.
- Do not construct SDK clients inside feature widgets; inject them from `lib/composition/` or the core package.
- Keep platform plugins behind typed host adapters.
- Generated SDK output is not edited by hand.
