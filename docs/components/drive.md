# Drive & Upload

- Component: `drive`
- Repository: `sdkwork-drive`
- Category: content
- SDK family: `sdkwork-drive-app-sdk`
- Permission module: `drive`

File storage, upload sessions, media resources, avatars, attachments, and download delivery.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/drive-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/drive-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/drive-app-sdk |  |
| ios | no | unsupported-language | — | — | sdkwork-drive-app-sdk has no swift output |
| android | yes | linked | java | com.sdkwork:sdkwork-drive-app-sdk-generated |  |
| harmony | yes | linked | typescript | @sdkwork/drive-app-sdk |  |
| flutter | no | declared | flutter | sdkwork-drive-app-sdk-generated | Flutter SDK package is missing pubspec.yaml |
| mini-program | yes | linked | typescript | @sdkwork/drive-app-sdk |  |

## Configuration

```json
{
  "uploadProfile": "default",
  "maxInlineUploadBytes": 10485760
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-drive routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/drive.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
