# Payment

- Component: `payment`
- Repository: `sdkwork-payment`
- Category: commerce
- SDK family: `sdkwork-payment-app-sdk`
- Permission module: `payment`

Payment intents, channels, refunds, reconciliation, and payment callbacks.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/payment-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/payment-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/payment-app-sdk |  |
| ios | no | unsupported-language | — | — | sdkwork-payment-app-sdk has no swift output |
| android | no | unsupported-language | — | — | sdkwork-payment-app-sdk has no kotlin/java output |
| harmony | yes | linked | typescript | @sdkwork/payment-app-sdk |  |
| flutter | no | unsupported-language | — | — | sdkwork-payment-app-sdk has no flutter/dart output |
| mini-program | yes | linked | typescript | @sdkwork/payment-app-sdk |  |

## Configuration

```json
{
  "channels": [
    "wechat",
    "alipay"
  ]
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-payment routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/payment.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
