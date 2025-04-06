import SwiftUI

struct ContentView: View {
    @State private var currentIndex = 0

    var body: some View {
        TabView(selection: $currentIndex) {
            MainMatchView()
            StatMatchView()

        }
        .tabViewStyle(.page)
        .navigationBarBackButtonHidden(true)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        return ContentView()
            .environmentObject(matchController)
    }
}
