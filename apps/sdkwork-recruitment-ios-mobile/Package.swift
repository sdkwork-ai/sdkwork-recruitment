// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "SdkworkRecruitmentIosMobile",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "SdkworkRecruitmentIosMobile",
            targets: ["SdkworkRecruitmentIosMobile"]
        )
    ],
    targets: [
        .target(
            name: "SdkworkRecruitmentIosMobile",
            path: "App"
        ),
        .testTarget(
            name: "SdkworkRecruitmentIosMobileTests",
            dependencies: ["SdkworkRecruitmentIosMobile"],
            path: "Tests"
        )
    ]
)
