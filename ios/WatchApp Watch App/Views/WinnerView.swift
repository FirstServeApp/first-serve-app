import SwiftUI
import ConfettiSwiftUI

struct WinnerView: View {
    @EnvironmentObject var matchController: MatchController
    @EnvironmentObject var phoneConnector: PhoneConnector
    @EnvironmentObject var navigationCoordinator: NavigationCoordinator
    @State private var counter = 0
    var isUserWins: Bool
    var retired: Player?
    
    var body: some View {
        VStack {
            Image(isUserWins ? "Winner" : "Loser")
                .resizable()
                .scaledToFit()
            Text(isUserWins ? "You’re\nthe winner!" : "Opponent\nwins")
                .frame(maxWidth: .infinity)
                .font(.system(.title3, weight: .semibold))
                .dynamicTypeSize(.large)
                .multilineTextAlignment(.center)
            Spacer()
            NavigationLink(destination: FinishView()) {
                Label("Finish", systemImage: "checkmark")
                    .foregroundColor(.black)
            }
            .buttonStyle(.borderedProminent)
            .tint(AppColors.Primary)
            .confettiCannon(counter: $counter, num: 3, confettis: [.shape(.square)], confettiSize: 15.0, repetitions: 20, repetitionInterval: 0.2)
            .simultaneousGesture(TapGesture().onEnded {
                if let match = matchController.getMatchJSON(retired: retired) {
                    let data = match.base64EncodedString()
                    phoneConnector.sendUserInfo(data: data, id: matchController.matchId.uuidString)
                }
            })
        }
        .onDisappear(perform: {
            matchController.undo()
        })
        .onAppear {
            if (isUserWins) {
                counter += 1
            }
        }
    }
}

struct WinnerView_Previews: PreviewProvider {
    static var previews: some View {
        WinnerView(isUserWins: true)
    }
}
