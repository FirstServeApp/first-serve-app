import SwiftUI

struct FinishMatchView: View {
    @EnvironmentObject var matchController: MatchController
    @EnvironmentObject var phoneConnector: PhoneConnector
    @EnvironmentObject var navigationCoordinator: NavigationCoordinator
    @EnvironmentObject var sessionController: SessionController
    
    private func getIsUserWins(retired: Player) -> Bool {
        return retired == .Me ? false : true
    }
    
    var body: some View {
        ScrollView(.vertical, showsIndicators: false) {
            Text("Who retired?")
                .font(.system(.title3).bold())
                .frame(maxWidth: .infinity, alignment: .leading)
            Spacer()
            Button(action: {
                sessionController.session.invalidate()
                matchController.finishMatchEarly()
                if let match = matchController.getMatchJSON(retired: Player.Me) {
                    let data = match.base64EncodedString()
                    phoneConnector.sendUserInfo(data: data, id: matchController.matchId.uuidString)
                }
                navigationCoordinator.goToWinner(isUserWins: self.getIsUserWins(retired: Player.Me), retired: Player.Me)
            }) {
                Text("Me").foregroundStyle(Color.black).fontWeight(.medium)
            }
            .button(color: AppColors.Primary)
            Button(action: {
                sessionController.session.invalidate()
                matchController.finishMatchEarly()
                if let match = matchController.getMatchJSON(retired: Player.Opponent) {
                    let data = match.base64EncodedString()
                    phoneConnector.sendUserInfo(data: data, id: matchController.matchId.uuidString)
                }
                navigationCoordinator.goToWinner(isUserWins: self.getIsUserWins(retired: Player.Opponent), retired: Player.Opponent)
            }) {
                Text("Opponent").foregroundStyle(Color.white).fontWeight(.medium)
            }
            .button(color: AppColors.Red)
            Button(action: {
                sessionController.session.invalidate()
                matchController.clearState()
                navigationCoordinator.restartMatch()
            }) {
                Text("Cancel without saving").fontWeight(.medium)
            }
            .clipShape(Capsule(style: RoundedCornerStyle.circular))
        }
    }
}

struct FinishMatchView_Previews: PreviewProvider {
    static var previews: some View {
        FinishMatchView()
    }
}
