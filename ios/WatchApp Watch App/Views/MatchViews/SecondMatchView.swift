import SwiftUI

struct SecondMatchView: View {
    @EnvironmentObject var matchController: MatchController
    @EnvironmentObject var navigationCoordinator: NavigationCoordinator
    @State private var shouldNavigate = false
    @State private var shouldNavigateToWinner = false

    var body: some View {
        let color = matchController.drawingWinner == Player.Opponent ? AppColors.Red : AppColors.Primary
        let isReturn = matchController.currentServer != matchController.drawingWinner
        let isMatchFinished = matchController.isMatchFinished
        
        return VStack {
            HStack {
                if !isReturn {
//                    NavigationLink(destination: destination) {
//                        Text("Ace")
//                            .foregroundColor(Color.black)
//                            .frame(maxHeight: .infinity)
//                    }
//                    .bigButton(color: color)
//                    .simultaneousGesture(TapGesture().onEnded {
//                        if matchController.drawingWinner == Player.Me {
//                            matchController.increaseMyGameScore(type: Serves.Ace)
//                        } else {
//                            matchController.increaseOpponentGameScore(type: Serves.Ace)
//                        }
//                    })
                    Button(action: {
                        if matchController.drawingWinner == Player.Me {
                            matchController.increaseMyGameScore(type: Serves.Ace)
                        } else {
                            matchController.increaseOpponentGameScore(type: Serves.Ace)
                        }

                        if matchController.isMatchFinished {
//                          shouldNavigateToWinner = true
                            let isUserWins = matchController.getWinner() == Player.Me
                            navigationCoordinator.goToWinner(isUserWins: isUserWins, retired: nil)
                        } else {
//                          shouldNavigate = true
                            navigationCoordinator.goToAndClear(to: .Main)
                        }
                    }) {
                        Text("Ace")
                            .foregroundColor(Color.black)
                            .frame(maxHeight: .infinity)
                    }
//                    .background(
//                      NavigationLink("", destination: ContentView(), isActive: $shouldNavigate)
//                        .opacity(0)
//                    )
//                    .background(
//                      NavigationLink("", destination: WinnerView(isUserWins: matchController.getWinner() == Player.Me), isActive: $shouldNavigateToWinner)
//                        .opacity(0)
//                    )
                    .bigButton(color: color)
                }
//                NavigationLink(destination: destination) {
//                    Text("Winner")
//                        .foregroundColor(Color.black)
//                        .frame(maxHeight: .infinity)
//                }
//                .bigButton(color: color)
//                .simultaneousGesture(TapGesture().onEnded {
//                    if matchController.drawingWinner == Player.Me {
//                        matchController.increaseMyGameScore(type: Serves.Winner)
//                    } else {
//                        matchController.increaseOpponentGameScore(type: Serves.Winner)
//                    }
//                })
                Button(action: {
                    if matchController.drawingWinner == Player.Me {
                        matchController.increaseMyGameScore(type: Serves.Winner)
                    } else {
                        matchController.increaseOpponentGameScore(type: Serves.Winner)
                    }

                    if matchController.isMatchFinished {
//                      shouldNavigateToWinner = true
                        let isUserWins = matchController.getWinner() == Player.Me
                        navigationCoordinator.goToWinner(isUserWins: isUserWins, retired: nil)
                    } else {
//                      shouldNavigate = true
                        navigationCoordinator.goToAndClear(to: .Main)
                    }
                }) {
                    Text("Winner")
                        .foregroundColor(Color.black)
                        .frame(maxHeight: .infinity)
                }
//                .background(
//                  NavigationLink("", destination: ContentView(), isActive: $shouldNavigate)
//                    .opacity(0)
//                )
//                .background(
//                  NavigationLink("", destination: WinnerView(isUserWins: matchController.getWinner() == Player.Me), isActive: $shouldNavigateToWinner)
//                    .opacity(0)
//                )
                .bigButton(color: color)
            }
            HStack {
//                NavigationLink(destination: destination) {
//                    Text("Forced\nerror")
//                        .foregroundColor(Color.black)
//                        .frame(maxHeight: .infinity)
//                }
//                .bigButton(color: color)
//                .simultaneousGesture(TapGesture().onEnded {
//                    if matchController.drawingWinner == Player.Me {
//                        matchController.increaseMyGameScore(type: Serves.ForcedError)
//                    } else {
//                        matchController.increaseOpponentGameScore(type: Serves.ForcedError)
//                    }
//                })
                Button(action: {
                    if matchController.drawingWinner == Player.Me {
                        matchController.increaseMyGameScore(type: Serves.ForcedError)
                    } else {
                        matchController.increaseOpponentGameScore(type: Serves.ForcedError)
                    }

                    if matchController.isMatchFinished {
//                      shouldNavigateToWinner = true
                        let isUserWins = matchController.getWinner() == Player.Me
                        navigationCoordinator.goToWinner(isUserWins: isUserWins, retired: nil)
                    } else {
//                      shouldNavigate = true
                        navigationCoordinator.goToAndClear(to: .Main)
                    }
//                    navigationCoordinator.path.removeLast(navigationCoordinator.path.count)
//                    if shouldNavigate {
//                        navigationCoordinator.goToAndClear(to: .Main)
//                        while navigationCoordinator.path.count > 1 {
//                            navigationCoordinator.path.removeLast()
//                        }
//                    } else if shouldNavigateToWinner {
//                        navigationCoordinator.goToAndClear(to: .Main)
//                    }
//                    navigationCoordinator.path.append(MatchScreens.Main)
                }) {
                    Text("Forced\nerror")
                        .foregroundColor(Color.black)
                        .frame(maxHeight: .infinity)
                }
//                .background(
//                  NavigationLink("", destination: ContentView(), isActive: $shouldNavigate)
//                    .opacity(0)
//                )
//                .background(
//                  NavigationLink("", destination: WinnerView(isUserWins: matchController.getWinner() == Player.Me), isActive: $shouldNavigateToWinner)
//                    .opacity(0)
//                )
                .bigButton(color: color)
//                NavigationLink(destination: destination) {
//                    Text("Unforced\nerror")
//                        .foregroundColor(Color.black)
//                        .frame(maxHeight: .infinity)
//                }
//                .bigButton(color: color)
//                .simultaneousGesture(TapGesture().onEnded {
//                    if matchController.drawingWinner == Player.Me {
//                        matchController.increaseMyGameScore(type: Serves.UnforcedError)
//                    } else {
//                        matchController.increaseOpponentGameScore(type: Serves.UnforcedError)
//                    }
//                })
                Button(action: {
                    if matchController.drawingWinner == Player.Me {
                        matchController.increaseMyGameScore(type: Serves.UnforcedError)
                    } else {
                        matchController.increaseOpponentGameScore(type: Serves.UnforcedError)
                    }

                    if matchController.isMatchFinished {
//                      shouldNavigateToWinner = true
                        let isUserWins = matchController.getWinner() == Player.Me
                        navigationCoordinator.goToWinner(isUserWins: isUserWins, retired: nil)
                    } else {
//                      shouldNavigate = true
                        navigationCoordinator.goToAndClear(to: .Main)
                    }
                }) {
                    Text("Unforced\nerror")
                        .foregroundColor(Color.black)
                        .minimumScaleFactor(0.01)
                        .frame(maxHeight: .infinity)
                }
//                UNCOMMENT IT
//                .background(
//                  NavigationLink("", destination: ContentView(), isActive: $shouldNavigate)
//                    .opacity(0)
//                )
//                .background(
//                  NavigationLink("", destination: WinnerView(isUserWins: matchController.getWinner() == Player.Me), isActive: $shouldNavigateToWinner)
//                    .opacity(0)
//                )
                .bigButton(color: color)
            }
        }
    }

}

struct SecondMatchView_Previews: PreviewProvider {
    static var previews: some View {
        let matchController = MatchController()
        return SecondMatchView()
            .environmentObject(matchController)
    }
}
