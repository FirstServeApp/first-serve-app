import Foundation
import Combine


enum Serves : String {
    case Ace = "Ace"
    case Winner = "Winner"
    case DoubleFault = "Double fault"
    case ForcedError = "Forced error"
    case UnforcedError = "Unforced error"
}

enum Player : String {
    case Me = "ME"
    case Opponent = "OPPONENT"
}

struct GameHistory : Codable {
    var myScore: Int
    var opponentScore: Int
    var serve: Int
    var type: String
    var server: String
}

struct Game: Codable {
    var index: Int
    var duration: Int
    var myScore: Int
    var opponentScore: Int
    var server: String
    var history: [GameHistory]
}

struct MatchSet : Codable {
    var index: Int
    var myScore: Int
    var opponentScore: Int
    var games: [Game]
}

struct MatchData : Codable {
    var winner: String
    var opponentName: String = "Opponent"
    var sets: [MatchSet]
    var duration: Int
    var matchUniqueId: String
}

struct MatchHistory {
    var myGameScore: Int
    var opponentGameScore: Int
    var currentServer: Player
    var drawingWinner: Player
    var currentSet: Int
    var myScores: [Int]
    var opponentScores: [Int]
    var drawingServe: Int
    var currentGame: Int
    var gameStartTime: Date
    var gameHistory: [GameHistory]
    var games: [Game]
    var gameSets: [MatchSet]
    var tiebreakServeNumber: Int
}


class MatchController: NSObject, ObservableObject/*, HKWorkoutSessionDelegate*/{
    var gameMod = 1
    @Published var opponentGameScore = 0
    @Published var myGameScore = 0
    @Published var opponentScores = [0, 0, 0]
    @Published var myScores = [0, 0, 0]
    var currentSet = 0
    @Published var currentServer = Player.Me
    var drawingWinner = Player.Me
    var drawingServe = 1
    var gameStartTime = Date()
    var matchStartTime = Date()
    var matchHistory: [MatchHistory] = []
    var isMatchPaused = false
    @Published var isMatchFinished = false
    
    var matchId = UUID()

    static var currentGame = 0
    static var pauseDuration = 0
    private var pauseStartTime: Date?
    private var tiebreakServeNumber = 1
    
    var gameHistory: [GameHistory] = []
    var games: [Game] = []
    var gameSets: [MatchSet] = []
  
    func getMatchJSON(retired: Player?) -> Data? {
        do {
            let matchDuration = calculateDuration(startTime: matchStartTime) - MatchController.pauseDuration
            let winnerByRules = getWinner() == Player.Me ? "me" : "opponent"
            let winnerByPoints = getEarlyFinishedWinner() == Player.Me ? "me" : "opponent"
            let autoWinner = getWinner() == nil ? winnerByPoints : winnerByRules
            let retiredWinner = retired == Player.Me ? "opponent" : "me"
            let winner = retired == nil ? autoWinner : retiredWinner

            let matchData = MatchData(
                winner: winner,
                opponentName: "Opponent",
                sets: gameSets,
                duration: matchDuration,
                matchUniqueId: matchId.uuidString
            )
            let jsonData = try JSONEncoder().encode(matchData)
            
            return jsonData
        } catch {
            print("Error occured when encoding to JSON: \(error)")
            return nil
        }
    }
    
    private func writeGameHistory(type: Serves, myScore: Int, opponentScore: Int) {
        let newRecord = GameHistory(
            myScore: myScore,
            opponentScore: opponentScore,
            serve: drawingServe,
            type: type.rawValue,
            server: drawingWinner.rawValue
        )
        gameHistory.append(newRecord)
        addToMatchHistory()
    }
    
    private func calculateDuration(startTime: Date) -> Int {
        let currentTime = Date()
        let timeInterval = currentTime.timeIntervalSince(startTime)
        let duration = Int(timeInterval)
        return duration
    }
    
    private func writeGame(gameDuration: Int, myScore: Int, opponentScore: Int) {
        let newRecord = Game(
            index: MatchController.currentGame,
            duration: gameDuration,
            myScore: myScore,
            opponentScore: opponentScore,
            server: currentServer.rawValue,
            history: gameHistory
        )
        games.append(newRecord)
    }
    
    private func writeGameSet() {
        let newRecord = MatchSet(
            index: currentSet,
            myScore: myScores[currentSet],
            opponentScore: opponentScores[currentSet],
            games: games
        )
        
        gameSets.append(newRecord)
    }
    
    private func finishGame() {
        let bothGameSetsEquals6 = myScores[currentSet] == 6 && opponentScores[currentSet] == 6
        let oneOfPlayersIsAD = myGameScore >= 55 || opponentGameScore >= 55
        let scoreDiff = abs(myGameScore - opponentGameScore) > 20
        let isGameFinished = (oneOfPlayersIsAD && scoreDiff) || (bothGameSetsEquals6 && (myGameScore >= 7 || opponentGameScore >= 7) && abs(myGameScore - opponentGameScore) >= 2)
        
        if isGameFinished {
            let gameDuration = calculateDuration(startTime: gameStartTime)
            if myGameScore > opponentGameScore {
                writeGame(gameDuration: gameDuration, myScore: myScores[currentSet]+1, opponentScore: opponentScores[currentSet])
                myScores[currentSet] = myScores[currentSet] + 1
            } else {
                writeGame(gameDuration: gameDuration, myScore: myScores[currentSet], opponentScore: opponentScores[currentSet]+1)
                opponentScores[currentSet] = opponentScores[currentSet] + 1
            }

            gameHistory = []
            myGameScore = 0
            opponentGameScore = 0
            MatchController.currentGame = MatchController.currentGame + 1
            currentServer = currentServer == Player.Me ? Player.Opponent : Player.Me
            gameStartTime = Date()
        }
        
        return finishSet()
    }
    
    func clearState() {
        opponentGameScore = 0
        myGameScore = 0
        opponentScores = [0, 0, 0]
        myScores = [0, 0, 0]
        currentSet = 0
        drawingWinner = Player.Me
        drawingServe = 1
        gameStartTime = Date()
        matchStartTime = Date()
        matchHistory = []
        isMatchPaused = false
        isMatchFinished = false
        
        matchId = UUID()

        MatchController.currentGame = 0
        MatchController.pauseDuration = 0
        tiebreakServeNumber = 1
        
        gameHistory = []
        games = []
        gameSets = []
    }
    
    func addToMatchHistory() {
        let data = MatchHistory(myGameScore: myGameScore, opponentGameScore: opponentGameScore, currentServer: currentServer, drawingWinner: drawingWinner, currentSet: currentSet, myScores: myScores, opponentScores: opponentScores, drawingServe: drawingServe, currentGame: MatchController.currentGame, gameStartTime: gameStartTime, gameHistory: gameHistory, games: games, gameSets: gameSets, tiebreakServeNumber: tiebreakServeNumber)
        matchHistory.append(data)
    }
    
    func undo() {
        isMatchFinished = false
        if !matchHistory.isEmpty {
            let index = matchHistory.count - 1 < 0 ? 0 : matchHistory.count - 1
            let info = matchHistory[index]
            
            myGameScore = info.myGameScore
            opponentGameScore = info.opponentGameScore
            currentServer = info.currentServer
            drawingWinner = info.drawingWinner
            currentSet = info.currentSet
            myScores = info.myScores
            opponentScores = info.opponentScores
            MatchController.currentGame = info.currentGame
            currentServer = info.currentServer
            var updatedGameHistory = info.gameHistory
            updatedGameHistory.removeLast()
            gameHistory = updatedGameHistory
            games = info.games
            gameSets = info.gameSets
            tiebreakServeNumber = info.tiebreakServeNumber
        
            matchHistory.removeLast()
        }
    }
    
    func startMatch() {
        clearState()
        gameStartTime = Date()
        matchStartTime = Date()
    }
    
    func pauseMatch() {
        isMatchPaused = true
        pauseStartTime = Date()
    }
    
    func finishMatchEarly() {
        writeGameSet()
        isMatchFinished = true
        return
    }
    
    func continueMatch() {
        if let time = pauseStartTime {
            let currentPauseDuration = calculateDuration(startTime: time)
            MatchController.pauseDuration += currentPauseDuration
        }
        isMatchPaused = false
    }

    func increaseOpponentGameScore(type: Serves) {
        let opponentIncreaseCount = (opponentGameScore == 30) ? 10 : 15
        let bothGameSetsEquals6 = myScores[currentSet] == 6 && opponentScores[currentSet] == 6
        if (bothGameSetsEquals6) {
            tiebreakServeNumber = tiebreakServeNumber + 1
            
            if tiebreakServeNumber >= 2 {
                tiebreakServeNumber = 0
                let newServer = currentServer == Player.Me ? Player.Opponent : Player.Me
                currentServer = newServer
            }
            
            writeGameHistory(type: type, myScore: myGameScore, opponentScore: opponentGameScore+1)
            opponentGameScore = opponentGameScore+1
        } else {
            if (myGameScore == 55) {
                writeGameHistory(type: type, myScore: 40, opponentScore: 40)
                myGameScore = 40
                opponentGameScore = 40
            } else {
                writeGameHistory(type: type, myScore: myGameScore, opponentScore: opponentGameScore + opponentIncreaseCount)
                opponentGameScore = opponentGameScore + opponentIncreaseCount
            }
        }
        
        return finishGame()
    }
    
    func increaseMyGameScore(type: Serves) {
        let myIncreaseCount = (myGameScore == 30) ? 10 : 15
        let bothGameSetsEquals6 = myScores[currentSet] == 6 && opponentScores[currentSet] == 6
        if (bothGameSetsEquals6) {
            tiebreakServeNumber = tiebreakServeNumber + 1
            
            if tiebreakServeNumber >= 2 {
                tiebreakServeNumber = 0
                let newServer = currentServer == Player.Me ? Player.Opponent : Player.Me
                currentServer = newServer
            }
            
            writeGameHistory(type: type, myScore: myGameScore+1, opponentScore: opponentGameScore)
            myGameScore = myGameScore+1
        } else {
            if (opponentGameScore == 55) {
                writeGameHistory(type: type, myScore: 40, opponentScore: 40)
                opponentGameScore = 40
                myGameScore = 40
            } else {
                writeGameHistory(type: type, myScore: myGameScore + myIncreaseCount, opponentScore: opponentGameScore)
                myGameScore = myGameScore + myIncreaseCount
            }
        }
        
        return finishGame()
    }
    
    func getWinner() -> Player? {
        let isOpponentWins: Bool
        let isUserWins: Bool

        if gameMod == 3 {
            let userWinCount = zip(myScores, opponentScores).filter { (my, opponent) in
                let tiebreakWinner = my == 7 && opponent == 6
                return my > opponent || tiebreakWinner
            }.count
            let opponentWinCount = zip(opponentScores, myScores).filter { (opponent, my) in
                let tiebreakWinner = opponent == 7 && my == 6
                return opponent > my || tiebreakWinner
            }.count
            
            isUserWins = userWinCount >= 2
            isOpponentWins = opponentWinCount >= 2
        } else {
                isOpponentWins = opponentScores[0] - myScores[0] >= 2 || (opponentScores[0] == 7 && myScores[0] == 6)
                isUserWins = myScores[0] - opponentScores[0] >= 2 || (opponentScores[0] == 6 && myScores[0] == 7)
        }
        
        if isUserWins {
            return .Me
        } else if isOpponentWins {
            return .Opponent
        } else {
            return nil
        }
    }
    
    func getEarlyFinishedWinner() -> Player {
        let isUserWins: Bool

        if gameMod == 3 {
            let userWinCount = zip(myScores, opponentScores).filter { (my, opponent) in
                let tiebreakWinner = my == 7 && opponent == 6
                return my > opponent || tiebreakWinner
            }.count
            let opponentWinCount = zip(opponentScores, myScores).filter { (opponent, my) in
                let tiebreakWinner = opponent == 7 && my == 6
                return opponent > my || tiebreakWinner
            }.count
            
            isUserWins = userWinCount > opponentWinCount
        } else {
            isUserWins = myScores[0] > opponentScores[0] || (opponentScores[0] == 6 && myScores[0] == 7)
        }
        
        if isUserWins {
            return .Me
        } else {
            return .Opponent
        }
    }
    
    private func finishSet() {
        let isOpponentTiebreakWinner = opponentScores[currentSet] == 7 && myScores[currentSet] == 6
        let isUserTiebreakWinner = myScores[currentSet] == 7 && opponentScores[currentSet] == 6
        let isUserWins = getWinner() == Player.Me
        let isOpponentWins = getWinner() == Player.Opponent
        let oneSetMoreThan6 = myScores[currentSet] >= 6 || opponentScores[currentSet] >= 6
        let endOfMatch = (isUserWins || isOpponentWins) && oneSetMoreThan6
        
        let gameSetScoreDiff = abs(myScores[currentSet] - opponentScores[currentSet]) >= 2
        let isSetFinished = oneSetMoreThan6 && (gameSetScoreDiff || isOpponentTiebreakWinner || isUserTiebreakWinner)
        
        if isSetFinished {
            writeGameSet()
            
            if endOfMatch {
                isMatchFinished = true
                return
            }
            
            MatchController.currentGame = 0
            myGameScore = 0
            opponentGameScore = 0
            games = []
            gameHistory = []
            currentSet = currentSet + 1
        }
    }
}
