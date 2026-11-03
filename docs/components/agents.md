# Agents

- Component: `agents`
- Repository: `sdkwork-agents`
- Category: ai
- SDK family: `sdkwork-agents-app-sdk`
- Permission module: `agents`

Agent definitions, runs, tools, conversations, and AI workflow orchestration.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/agents-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/agents-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/agents-app-sdk |  |
| ios | no | unsupported-language | — | — | sdkwork-agents-app-sdk has no swift output |
| android | no | unsupported-language | — | — | sdkwork-agents-app-sdk has no kotlin/java output |
| harmony | yes | linked | typescript | @sdkwork/agents-app-sdk |  |
| flutter | yes | linked | flutter | sdkwork_agents_app_sdk |  |
| mini-program | yes | linked | typescript | @sdkwork/agents-app-sdk |  |

## Configuration

```json
{
  "streaming": true,
  "toolApproval": "explicit"
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-agents routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/agents.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
