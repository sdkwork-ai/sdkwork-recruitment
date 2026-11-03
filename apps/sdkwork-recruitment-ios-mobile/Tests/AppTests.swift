import XCTest
@testable import SdkworkRecruitmentIosMobile

final class AppTests: XCTestCase {
    func testComponentRegistryIsAvailable() {
        XCTAssertFalse(SdkworkRecruitmentIosMobileComponentRegistry.components.isEmpty)
    }
}
