import SwiftUI


func getValidScoreText(score: Int) -> String {
    switch score {
    case 0:
        return "00"
    case 55:
        return "AD"
    default:
        return String(score)
    }
}


struct MainMatchView: View {
  @EnvironmentObject var matchController: MatchController
  @EnvironmentObject var navigationCoordinator: NavigationCoordinator

  var body: some View {
    @State var isUserServes = matchController.currentServer == Player.Me

    return VStack(alignment: .center) {
      HStack(alignment: .top) {
        VStack(alignment: .center) {
          Button(action: {
            matchController.drawingWinner = Player.Me
            isUserServes = true
            navigationCoordinator.path.append(MatchScreens.First)
          }) {
            Text(getValidScoreText(score: matchController.myGameScore))
              .font(.system(size: 48, weight: .medium))
              .minimumScaleFactor(0.01)
              .background(.clear)
              .foregroundColor(AppColors.Primary)
              .opacity(isUserServes ? 1 : 0.5)
          }
          .background(isUserServes ? Color(red: 0.129, green: 0.13, blue: 0.13) : Color.clear)
          .cornerRadius(22.0)
          .buttonStyle(.borderedProminent)
          .tint(isUserServes ? Color(red: 0.129, green: 0.13, blue: 0.13) : Color.clear);
          Spacer(minLength: 5)
          if matchController.currentServer == Player.Me {
            Image("LogoIcon")
              .frame(width: 72)
          }
        }
        VStack(alignment: .center) {
          Spacer()
          Text(":")
            .font(.system(size: 40, weight: .medium))
            .foregroundColor(.white)
            .multilineTextAlignment(.center)
            .padding(.bottom)
            .offset(y: -15)
          Spacer()
        }
        VStack(alignment: .center) {
          Button(action: {
            isUserServes = false
            matchController.drawingWinner = Player.Opponent
            navigationCoordinator.path.append(MatchScreens.First)
          }) {
            Text(getValidScoreText(score: matchController.opponentGameScore))
              .font(.system(size: 48, weight: .medium))
              .minimumScaleFactor(0.01)
              .background(.clear)
              .foregroundColor(AppColors.Red)
              .opacity(isUserServes ? 0.5 : 1)
          }
          .background(isUserServes ? Color.clear : Color(red: 0.129, green: 0.13, blue: 0.13))
          .cornerRadius(22.0)
          .buttonStyle(.borderedProminent)
          .tint(isUserServes ? Color.clear : Color(red: 0.129, green: 0.13, blue: 0.13))
          Spacer(minLength: 5)
          if matchController.currentServer == Player.Opponent {
            Image("LogoIcon")
              .frame(width: 72)
          }
        }
      }
      .padding([.bottom, .leading, .trailing])
      Spacer()
      Button(action: {
        matchController.undo()
      }) {
        Text("Undo").fontWeight(.medium)
      }
    }
  }
}


struct MainMatchView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        MainMatchView()
            .environmentObject(matchController)
    }
}
