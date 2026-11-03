import 'package:flutter_test/flutter_test.dart';
import 'package:sdkwork_recruitment_flutter_mobile/app.dart';

void main() {
  testWidgets('renders the SDKWork foundation shell', (WidgetTester tester) async {
    await tester.pumpWidget(const SdkworkApp());
    expect(find.text(appName), findsOneWidget);
    expect(find.text('Integrated components'), findsOneWidget);
  });
}
