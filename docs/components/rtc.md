# RTC

- Component: `rtc`
- Repository: `sdkwork-rtc`
- Category: communication
- SDK family: `sdkwork-rtc-app-sdk`
- Permission module: `rtc`

Real-time audio/video rooms, calls, participants, media devices, and quality telemetry.

## Architecture Availability

| Architecture | Supported | Mode | Language | Package | Note |
| --- | --- | --- | --- | --- | --- |
| pc | no | declared | typescript | @sdkwork/rtc-app-sdk | generated TypeScript transport dist is missing; build the dependency SDK before linking |
| h5 | no | declared | typescript | @sdkwork/rtc-app-sdk | generated TypeScript transport dist is missing; build the dependency SDK before linking |
| pad | no | declared | typescript | @sdkwork/rtc-app-sdk | generated TypeScript transport dist is missing; build the dependency SDK before linking |
| ios | no | unsupported-language | — | — | sdkwork-rtc-app-sdk has no swift output |
| android | no | declared | java | com.sdkwork:sdkwork-rtc-app-sdk | SDK package path does not exist: D:\sdkwork-space\sdkwork-rtc\sdks\sdkwork-rtc-app-sdk\sdkwork-rtc-app-sdk-java |
| harmony | no | declared | typescript | @sdkwork/rtc-app-sdk | generated TypeScript transport dist is missing; build the dependency SDK before linking |
| flutter | yes | linked | dart | sdkwork_rtc_app_sdk |  |
| mini-program | no | declared | typescript | @sdkwork/rtc-app-sdk | generated TypeScript transport dist is missing; build the dependency SDK before linking |

## Configuration

```json
{
  "media": "audio-video",
  "region": "auto"
}
```

## Permissions

- No explicit permission scope selected. Inherit the component module catalog.

## Integration Rules

- Consume the generated app SDK package for the architecture language.
- Never copy sdkwork-rtc routes, DTOs, or generated transport into this application.
- Keep credentials in the global token manager / host adapter, never in component config.
- Change component settings through `config/components/rtc.json`, not by editing generated code.

See `../sdkwork-specs/APP_SDK_INTEGRATION_SPEC.md`.
