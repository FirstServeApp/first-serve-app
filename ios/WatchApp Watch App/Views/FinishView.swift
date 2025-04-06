import SwiftUI

struct FinishView: View {
  @EnvironmentObject var matchController: MatchController
  @EnvironmentObject var navigationCoordinator: NavigationCoordinator
  
  var body: some View {
    VStack {
      Text("Open First Serve App on your phone to see statistics")
        .font(.system(.body).weight(.medium))
        .frame(maxWidth: .infinity, alignment: .leading)
      Spacer()
      Button(action: {
        matchController.clearState()
        navigationCoordinator.restartMatch()
      }) {
        Label("New match", systemImage: "arrow.counterclockwise")
          .foregroundColor(.black)
      }
      .button(color: Color("Primary"))
    }
    .navigationBarBackButtonHidden(true)
  }
}

struct FinishView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        return FinishView()
            .environmentObject(matchController)
}}
