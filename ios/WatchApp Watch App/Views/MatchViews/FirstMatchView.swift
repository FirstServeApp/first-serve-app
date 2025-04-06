import SwiftUI

struct FirstMatchView: View {
    @EnvironmentObject var matchController: MatchController
  @EnvironmentObject var navigationCoordinator: NavigationCoordinator
    @State private var shouldNavigate = false
    @State private var shouldNavigateToWinner = false

  var body: some View {
    let color = matchController.drawingWinner == Player.Opponent ? AppColors.Red : AppColors.Primary
    let isReturn = matchController.currentServer != matchController.drawingWinner
    
    return VStack {
        HStack {
          NavigationLink(value: MatchScreens.Second) {
            Text("1st\nServe")
              .foregroundColor(Color.black)
              .frame(maxHeight: .infinity)
          }
          .bigButton(color: color)
          .simultaneousGesture(TapGesture().onEnded {
            matchController.drawingServe = 1
          })
          NavigationLink(value: MatchScreens.Second) {
            Text("2nd\nServe")
              .foregroundColor(Color.black)
              .frame(maxHeight: .infinity)
          }
          .bigButton(color: color)
          .simultaneousGesture(TapGesture().onEnded {
            matchController.drawingServe = 2
          })
        }
        if isReturn {
          Button(action: {
            matchController.drawingServe = 2
            if matchController.drawingWinner == Player.Me {
              matchController.increaseMyGameScore(type: Serves.DoubleFault)
            } else {
              matchController.increaseOpponentGameScore(type: Serves.DoubleFault)
            }
            
            if matchController.isMatchFinished {
              let isUserWins = matchController.getWinner() == Player.Me
              navigationCoordinator.goToWinner(isUserWins: isUserWins, retired: nil)
            } else {
              navigationCoordinator.goToAndClear(to: .Main)
            }
          }) {
            Text("Double Fault")
              .foregroundColor(Color.black)
              .frame(maxHeight: .infinity)
          }
          .bigButton(color: color)
        }
      }
      .navigationBarBackButtonHidden(true)
  }
}

struct FirstMatchView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        return FirstMatchView()
            .environmentObject(matchController)
    }
}
