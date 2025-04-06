import SwiftUI


struct WhatGameView: View {
    @EnvironmentObject var matchController: MatchController
    @EnvironmentObject var navigationCoordinator: NavigationCoordinator

    var body: some View {
        VStack(alignment: .leading) {
          Text("Match format")
            .font(.system(.title3).bold())
            .dynamicTypeSize(.large)
          Text("Tiebreak\nup to 7 points")
            .font(.system(.headline).weight(.regular))
            .multilineTextAlignment(.leading)
            .fixedSize(horizontal: false, vertical: true)
            .dynamicTypeSize(.large)
          Spacer()
          VStack(alignment: .center) {
            Button(action: {
              matchController.gameMod = 1
              navigationCoordinator.path.append(SettingsScreens.WhoServesFirst)
            }) {
              Text("1 set")
                .foregroundColor(Color.black)
            }
            .buttonStyle(.borderedProminent)
            .tint(AppColors.Primary)
            Button(action: {
              matchController.gameMod = 3
              navigationCoordinator.path.append(SettingsScreens.WhoServesFirst)
            }) {
              Text("3 sets")
                .foregroundColor(Color.black)
            }
            .buttonStyle(.borderedProminent)
            .tint(AppColors.Primary)
          }
        }
        .frame(maxWidth: .infinity)
        .navigationBarBackButtonHidden(true)
    }
}


struct WhatGameView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        @State var path = NavigationPath()
        return WhatGameView()
            .environmentObject(matchController)
}}
