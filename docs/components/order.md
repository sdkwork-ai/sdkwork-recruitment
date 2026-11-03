# Order & Checkout

- Component: `order`
- Repository: `sdkwork-order`
- Category: commerce
- SDK family: `sdkwork-order-app-sdk`
- Permission module: `commerce`

Orders, checkout, payments, recharges, after-sales, fulfillment, and withdrawals.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | yes | linked | typescript | @sdkwork/order-app-sdk |  |
| h5 | yes | linked | typescript | @sdkwork/order-app-sdk |  |
| pad | yes | linked | typescript | @sdkwork/order-app-sdk |  |
| ios | no | unsupported-language | — | — | sdkwork-order-app-sdk has no swift output |
| android | no | unsupported-language | — | — | sdkwork-order-app-sdk has no kotlin/java output |
| harmony | yes | linked | typescript | @sdkwork/order-app-sdk |  |
| flutter | no | unsupported-language | — | — | sdkwork-order-app-sdk has no flutter/dart output |
| mini-program | yes | linked | typescript | @sdkwork/order-app-sdk |  |

## Configuration

```json
{
  "currency": "CNY",
  "idempotency": true
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-order routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/order.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
