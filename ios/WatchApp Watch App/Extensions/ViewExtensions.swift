import Foundation
import SwiftUI


extension View {
    func bigButton(color: Color) -> some View {
        self
            .buttonStyle(.borderedProminent)
            .tint(color)
            .background(color)
            .cornerRadius(22.0)
    }
}

@available(iOS 13.0, macOS 10.15, tvOS 13.0, watchOS 6.0, *)
extension View {
    func button(color: Color) -> some View {
        self
            .tint(color)
            .buttonStyle(.borderedProminent)
//            .clipShape(.capsule)
            .clipShape(Capsule())
    }
}
@available(iOS 13.0, macOS 10.15, tvOS 13.0, watchOS 6.0, *)
extension NavigationLink {
    func button(color: Color) -> some View {
        self
            .tint(color)
            .buttonStyle(.borderedProminent)
//            .clipShape(.capsule)
            .clipShape(Capsule())
    }
}
@available(iOS 13.0, macOS 10.15, tvOS 13.0, watchOS 6.0, *)
extension NavigationLink {
    func flatButton() -> some View {
        self
            .buttonStyle(.borderedProminent)
//            .clipShape(.capsule)
            .clipShape(Capsule())
    }
}
