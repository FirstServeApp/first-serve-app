import SwiftUI


public extension View {
  func fullBackground(imageName: String, d: Bool) -> some View {
    return background(
      Image(imageName)
        .transition(.opacity)
        .ignoresSafeArea(.container)
        .offset(x: 50, y: -80)
        .clipped()
        .opacity(d ? 0 : 1)
      )
  }
}


struct WhoServesFirstView: View {
    @EnvironmentObject var matchController: MatchController
  @EnvironmentObject var navigationCoordinator: NavigationCoordinator
    @State private var onDisappear = false

    var body: some View {
            ZStack(alignment: .center) {
                Spacer()
                VStack {
                    Spacer()
                    Text("Who serves first?")
                        .font(.system(.title3).bold())
                        .dynamicTypeSize(.large)
                    VStack(alignment: .center) {
                      Button(action: {
                        onDisappear = true
                        matchController.currentServer = Player.Me
                        navigationCoordinator.path.append(SettingsScreens.StartMatch)
                      }) {
                        Text("Me").foregroundColor(.black)
                      }
                        .buttonStyle(.borderedProminent)
                        .tint(AppColors.Primary)
                      Button(action: {
                        onDisappear = true
                        matchController.currentServer = Player.Opponent
                        navigationCoordinator.path.append(SettingsScreens.StartMatch)
                      }) {
                        Text("Opponent")
                      }
                        .buttonStyle(.borderedProminent)
                        .tint(AppColors.Red)
                    }
                }
            }
            .frame(maxHeight: .infinity, alignment: .center)
            .onDisappear(perform: {
              onDisappear = false
            })
            .fullBackground(imageName: "FirstServeIllustration", d: onDisappear)
            .transition(.opacity)
            .navigationBarBackButtonHidden(false)
    }
}

struct WhoServesFirstView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        return WhoServesFirstView()
            .environmentObject(matchController)
    }
}
