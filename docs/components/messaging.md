# Messaging

- Component: `messaging`
- Repository: `sdkwork-messaging`
- Category: communication
- SDK family: `sdkwork-messaging-app-sdk`
- Permission module: `messaging`

Notification delivery, templates, channels, and message dispatch.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/messaging-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/messaging-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/messaging-app-sdk |  |
| ios | no | unsupported-language | — | — | sdkwork-messaging-app-sdk has no swift output |
| android | no | unsupported-language | — | — | sdkwork-messaging-app-sdk has no kotlin/java output |
| harmony | yes | linked | typescript | @sdkwork/messaging-app-sdk |  |
| flutter | no | unsupported-language | — | — | sdkwork-messaging-app-sdk has no flutter/dart output |
| mini-program | yes | linked | typescript | @sdkwork/messaging-app-sdk |  |

## Configuration

```json
{
  "channels": [
    "in-app",
    "push"
  ]
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-messaging routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/messaging.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
