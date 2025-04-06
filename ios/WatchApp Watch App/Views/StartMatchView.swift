import SwiftUI

struct StartMatchView: View {
  @EnvironmentObject var matchController: MatchController
  @EnvironmentObject var navigationCoordinator: NavigationCoordinator
  @EnvironmentObject var sessionController: SessionController
    
  var body: some View {
    VStack {
      Text("Press when you're ready")
        .lineLimit(/*@START_MENU_TOKEN@*/2/*@END_MENU_TOKEN@*/)
        .fixedSize(horizontal: false, vertical: true)
        .font(.system(.title3).bold())
        .frame(maxWidth: .infinity, alignment: .leading)
      Spacer()
      Image("TennisBall")
        .resizable()
        .scaledToFit()
      Spacer()
      Button(action: {
        sessionController.startNew()
        matchController.startMatch()
        navigationCoordinator.goToAndClear(to: .Main)
      }) {
        Text("Let's start!")
          .foregroundColor(Color.black)
      }
      .button(color: Color("Primary"))
    }
  }
}

struct StartMatchView_Previews: PreviewProvider {
  static var previews: some View {
    StartMatchView()
  }
}
