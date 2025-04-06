import SwiftUI

struct StatMatchView: View {
    @EnvironmentObject var matchController: MatchController
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Match score")
                .font(.system(size: 22).weight(.semibold))
                .lineSpacing(24)
                .foregroundColor(.white);
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
            NavigationLink(value: MatchScreens.Stop) {
                Text("Stop the match")
            }
        }
    }
}

struct StatMatchView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        StatMatchView()
            .environmentObject(matchController)
    }
}
