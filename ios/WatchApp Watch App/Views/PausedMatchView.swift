import SwiftUI

struct PausedMatchView: View {
  @EnvironmentObject var matchController: MatchController
  @EnvironmentObject var navigationCoordinator: NavigationCoordinator
    
  var body: some View {
    VStack {
      Text("Match paused")
        .font(.system(.title3).bold())
        .frame(maxWidth: .infinity, alignment: .leading)
      Spacer()
      HStack() {
        VStack() {
          Cell(didTop: true, gameMod: matchController.gameMod, currentServer: $matchController.currentServer, myScores: $matchController.myScores, opponentScores: $matchController.opponentScores, currentSet: $matchController.currentSet )
          Cell(didTop: false, gameMod: matchController.gameMod, currentServer: $matchController.currentServer, myScores: $matchController.myScores, opponentScores: $matchController.opponentScores, currentSet: $matchController.currentSet )
        }
        .frame(height: 68, alignment: .trailing)
        .background(Color(red: 0.13, green: 0.13, blue: 0.14))
        .cornerRadius(8)
        .frame(maxWidth: .infinity)
      }
      .frame(maxWidth: .infinity)
      Spacer()
      Button(action: {
        matchController.continueMatch()
        navigationCoordinator.goToAndClear(to: .Main)
      }) {
        Text("Continue").foregroundColor(.black)
      }
      .button(color: AppColors.Primary)
    }
    .navigationBarBackButtonHidden(true)
  }
}

struct PausedMatchView_Previews: PreviewProvider {
  static var previews: some View {
    let matchController = MatchController()
    PausedMatchView()
      .environmentObject(matchController)
  }
}
