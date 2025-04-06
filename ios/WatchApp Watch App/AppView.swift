import SwiftUI


@main
struct AppView: App {
  @StateObject private var matchController = MatchController()
  @StateObject private var phoneConnector = PhoneConnector()
  @StateObject var navigationCoordinator = NavigationCoordinator()
  @StateObject private var sessionController = SessionController()
  
  var body: some Scene {
    WindowGroup {
      NavigationStack(path: $navigationCoordinator.path) {
        WhatGameView()
          .navigationDestination(for: SettingsScreens.self) {path in
            switch path {
            case .WhatGame: WhatGameView()
            case .WhoServesFirst: WhoServesFirstView()
            case .StartMatch: StartMatchView()
            }
          }
          .navigationDestination(for: MatchScreens.self) { path in
            switch path {
            case .Main: ContentView()
            case .First: FirstMatchView()
            case .Second: SecondMatchView()
            case .Stop: StopMatchView()
            case .Paused: PausedMatchView()
            case .Finish: FinishMatchView()
            }
          }
          .navigationDestination(for: Winner.self) {winner in
            WinnerView(isUserWins: winner.isUserWins, retired: winner.retired)
          }
      }
      .environmentObject(matchController)
      .environmentObject(phoneConnector)
      .environmentObject(navigationCoordinator)
      .environmentObject(sessionController)
    }
  }
}

struct Winner: Hashable {
  let isUserWins: Bool
  let retired: Player?
}

enum SettingsScreens {
    case WhatGame, WhoServesFirst, StartMatch
}

enum MatchScreens {
    case Main, First, Second, Stop, Paused, Finish
}

class NavigationCoordinator: ObservableObject {
    @Published var path = NavigationPath()
    
    func goToAndClear(to: MatchScreens) {
        var newPath = NavigationPath()
        newPath.append(to)
        path = newPath
    }
  
  func goToWinner(isUserWins: Bool, retired: Player?) {
    var newPath = NavigationPath()
    newPath.append(MatchScreens.Main)
    newPath.append(Winner(isUserWins: isUserWins, retired: retired))
    path = newPath
  }
  
  func restartMatch() {
    var newPath = NavigationPath()
    newPath.append(SettingsScreens.WhatGame)
    path = newPath
  }
}
