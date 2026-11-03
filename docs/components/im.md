# IM & Messaging

- Component: `im`
- Repository: `sdkwork-im`
- Category: communication
- SDK family: `sdkwork-im-app-sdk`
- Permission module: `im`

Conversations, messages, contacts, channels, presence, and realtime delivery.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/im-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/im-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/im-app-sdk |  |
| ios | yes | linked | swift | ImAppApiGenerated |  |
| android | yes | linked | kotlin | com.sdkwork:im-app-api-generated |  |
| harmony | yes | linked | typescript | @sdkwork/im-app-sdk |  |
| flutter | no | declared | flutter | im_app_api_generated | Flutter SDK package is missing pubspec.yaml |
| mini-program | yes | linked | typescript | @sdkwork/im-app-sdk |  |

## Configuration

```json
{
  "historyPageSize": 50,
  "readReceipts": true,
  "presence": true
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-im routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/im.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
