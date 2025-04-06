import SwiftUI


struct StopMatchView: View {
    @EnvironmentObject var matchController: MatchController
    
  var body: some View {
      VStack {
          Text("Stop the match")
              .font(.system(.title3).bold())
              .frame(maxWidth: .infinity, alignment: .leading)
          Spacer()
          NavigationLink(value: MatchScreens.Paused) {
              Label("Pause", systemImage: "pause.fill")
                  .foregroundColor(.black)
          }
          .button(color: AppColors.Primary)
          .simultaneousGesture(TapGesture().onEnded {
              matchController.pauseMatch()
          })
          NavigationLink(value: MatchScreens.Finish) {
              Label("Finish", systemImage: "checkmark")
                  .foregroundColor(.black)
          }
          .button(color: AppColors.Primary)
      }
  }
}

struct StopMatchView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        StopMatchView()
            .environmentObject(matchController)
    }
}
