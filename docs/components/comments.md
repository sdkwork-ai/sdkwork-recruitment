# Comments

- Component: `comments`
- Repository: `sdkwork-comments`
- Category: content
- SDK family: `sdkwork-comments-app-sdk`
- Permission module: `comments`

Threaded comments, mentions, reactions, and moderation hooks.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/comments-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/comments-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/comments-app-sdk |  |
| ios | no | unsupported-language | — | — | sdkwork-comments-app-sdk has no swift output |
| android | no | unsupported-language | — | — | sdkwork-comments-app-sdk has no kotlin/java output |
| harmony | yes | linked | typescript | @sdkwork/comments-app-sdk |  |
| flutter | no | unsupported-language | — | — | sdkwork-comments-app-sdk has no flutter/dart output |
| mini-program | yes | linked | typescript | @sdkwork/comments-app-sdk |  |

## Configuration

```json
{
  "threading": true,
  "pageSize": 20
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-comments routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/comments.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
