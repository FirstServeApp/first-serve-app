import { useNavigation } from '@react-navigation/native'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AuthenticatedNavigationProps } from '../navigation/AuthenticatedNavigation'
import matchService, { CreateMatchSet, Game, GameHistory, MatchData } from '../services/matchService'
import { useStopwatch } from 'react-timer-hook'
import Toast from 'react-native-toast-message'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'


export enum GameStates {
  firstServe = 'FIRST_SERVE',
  drawing = 'DRAWING',
  gameFirstStep = 'GAME_FIRST_STEP',
  gameSecondStep = 'GAME_SECOND_STEP',
}

export enum Player {
  me = 'ME',
  opponent = 'OPPONENT',
  default = 'DEFAULT',
}

export type PausedMatch = {
  opponentName: string
  gameMod: number
  myGameScore: number
  opponentGameScore: number
  currentState: GameStates
  currentServer: Player
  drawingWinner: Player
  currentSet: number
  myScores: number[]
  opponentScores: number[]
  isTiebreak: boolean
  tiebreakServeNumber: number
  drawingServe: number
  currentGame: number
  gameStartTime: Date
  gameHistory: GameHistory[]
  games: Game[]
  gameSets: CreateMatchSet[]
  matchHistory: any[]
  isMatchPaused: boolean
  testMatchFinish: boolean
  matchChangesHistory: any[]
  totalSeconds: number
  id: number
}

export type MatchContextData = {
  opponentName: string;
  setOpponentName(value: string): void;
  newOpponentName: string;
  setNewOpponentName(value: string): void;
  currentState: GameStates;
  setCurrentState: React.Dispatch<React.SetStateAction<GameStates>>;
  myGameScore: number;
  setMyGameScore: React.Dispatch<React.SetStateAction<number>>;
  opponentGameScore: number;
  setOpponentGameScore: React.Dispatch<React.SetStateAction<number>>;
  currentServer: Player;
  setCurrentServer: React.Dispatch<React.SetStateAction<Player>>;
  drawingWinner: Player;
  setDrawingWinner: React.Dispatch<React.SetStateAction<Player>>;
  currentSet: number;
  setCurrentSet: React.Dispatch<React.SetStateAction<number>>;
  myScores: number[];
  setMyScores: React.Dispatch<React.SetStateAction<number[]>>;
  opponentScores: number[];
  setOpponentScores: React.Dispatch<React.SetStateAction<number[]>>;
  isTiebreak: boolean;
  setGameScore(winner: Player, serve?: string, server?: string, type?: string): void;
  setDrawingServe: React.Dispatch<React.SetStateAction<number>>;
  gameMod: number;
  setGameMod: React.Dispatch<React.SetStateAction<number>>;
  matchDuration: number;
  startMatch(): void;
  undo(): void;
  showMatchPopup: boolean;
  setShowMatchPopup: React.Dispatch<React.SetStateAction<boolean>>;
  finishMatch(isUserRetired: boolean): void;
  cancelMatch(): void;
  cancelMatchV2(): Promise<void>;
  matchHistory: any[];
  isMatchPaused: boolean;
  pauseMatch(): void;
  pauseMatchV2(): Promise<void>;
  continueMatch(): void;
  continueMatchV2(id: number): Promise<void>;
  testMatchFinish: boolean;
  clearState(): void;
  launchMatch(): void;
  undoFirstServer(): void;
  addToMatchHistory(): void;
  matchChangesHistory: any[];
  setPausedMatchId: React.Dispatch<React.SetStateAction<number | undefined>>;
  pausedMatchId: number | undefined;
  // saveMatch(isOpponentWins: boolean, opponentName: string, sets: CreateMatchSet[], duration: number): Promise<void>;
  storage: Storage;
}

const MatchContext = createContext<MatchContextData>({} as MatchContextData)

export const useMatch = (): MatchContextData => {
  const context = useContext(MatchContext)

  if (!context) {
    throw new Error('useMatch must be used within an MatchProvider')
  }

  return context
}

let matchChangesHistory: any[] = []
const storage = new Storage({
  size: 10,
  storageBackend: AsyncStorage,
  enableCache: true,
  // expire time, one week
  defaultExpires: 1000 * 3600 * 24 * 7,
})

export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [opponentName, setOpponentName] = useState('Opponent')
  const [newOpponentName, setNewOpponentName] = useState('')
  const [gameMod, setGameMod] = useState<number>(1)
  const [myGameScore, setMyGameScore] = useState<number>(0)
  const [opponentGameScore, setOpponentGameScore] = useState<number>(0)
  const [currentState, setCurrentState] = useState<GameStates>(GameStates.firstServe)
  const [currentServer, setCurrentServer] = useState<Player>(Player.default)
  const [drawingWinner, setDrawingWinner] = useState<Player>(Player.me)
  const [currentSet, setCurrentSet] = useState<number>(0)
  const [myScores, setMyScores] = useState<number[]>([0, 0, 0])
  const [opponentScores, setOpponentScores] = useState<number[]>([0, 0, 0])
  const [isTiebreak, setTiebreak] = useState(false)
  // WARNING
  const [tiebreakServeNumber, setTiebreakServeNumber] = useState<number>(2)
  const [drawingServe, setDrawingServe] = useState<number>(1)
  const [currentGame, setCurrentGame] = useState<number>(0)
  const { totalSeconds, start, pause, reset } = useStopwatch({ autoStart: false })
  const [gameStartTime, setGameStartTime] = useState<Date>(new Date())
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [gameSets, setGameSets] = useState<CreateMatchSet[]>([])
  const [matchHistory, setMatchHistory] = useState<any[]>([])
  const [showMatchPopup, setShowMatchPopup] = useState(false)
  const [isMatchPaused, setMatchPaused] = useState(false)
  const [testMatchFinish, setMatchFinish] = useState(false)

  const [pausedMatchId, setPausedMatchId] = useState<number>()

  const addToMatchHistory = () => {
    const data = {
      myGameScore,
      opponentGameScore,
      currentState,
      currentServer,
      drawingWinner,
      currentSet,
      myScores,
      opponentScores,
      isTiebreak,
      drawingServe,
      currentGame,
      gameStartTime,
      gameHistory,
      games,
      gameSets,
      matchHistory,
    }
    // setMatchHistory(prev => [...prev, data])
    if (matchChangesHistory.length >= 30) {
      matchChangesHistory.shift()
    }
    matchChangesHistory.push(data)
  }

  const undoFirstServer = () => {
    setCurrentState(GameStates.firstServe)
    setCurrentServer(Player.default)
  }

  const undo = () => {
    setShowMatchPopup(false)
    if (matchChangesHistory.length > 0) {
      const index = matchChangesHistory.length - 1 || 0
      const info = matchChangesHistory[index]

      setCurrentState(info.currentState)
      setMyGameScore(info.myGameScore)
      setOpponentGameScore(info.opponentGameScore)
      setCurrentSet(info.currentSet)
      // setCurrentState(index === 0 ? GameStates.firstServe : GameStates.drawing)
      setDrawingServe(info.drawingServe)
      setMyScores(info.myScores)
      setOpponentScores(info.opponentScores)
      setCurrentGame(info.currentGame)
      setCurrentServer(info.currentServer)
      setDrawingWinner(info.drawingWinner)
      setGameHistory(info.gameHistory)
      setGames(info.games)
      setGameSets(info.gameSets)
      matchChangesHistory.pop()
    }
  }

  const clearState = () => {
    setMyGameScore(0)
    setOpponentGameScore(0)
    setCurrentState(GameStates.firstServe)
    setCurrentServer(Player.default)
    setDrawingWinner(Player.me)
    setCurrentSet(0)
    setMyScores([0, 0, 0])
    setOpponentScores([0, 0, 0])
    setTiebreak(false)
    setDrawingServe(1)
    setCurrentGame(0)
    setGameHistory([])
    setGames([])
    setGameSets([])
    reset(undefined, false)
    setMatchHistory([])
    setShowMatchPopup(false)
    setMatchPaused(false)
    setMatchFinish(false)
    setTiebreakServeNumber(2)
    matchChangesHistory.length = 0

    setPausedMatchId(undefined)
  }

  const startMatch = () => {
    reset()
    clearState()
    setGameStartTime(new Date())
    navigation.navigate('Match')
  }

  const launchMatch = () => {
    reset()
    setGameStartTime(new Date())
  }

  const cancelMatchV2 = async () => {
    if (pausedMatchId !== undefined) {
      try {
        await storage.remove({ key: 'pausedMatches', id: pausedMatchId.toString() })
      } catch {}
    }
    // setPausedMatchId(undefined)
    clearState()
    navigation.navigate('Home')
  }

  const cancelMatch = () => {
    clearState()
    navigation.navigate('Home')
  }

  const [test1, test2] = useState<boolean>(false)
  const goToWinner = async () => {
    // const isOpponentWins = gameMod === 3
    //   ? opponentScores.filter((num, index) => num > myScores[index]).length >= 2
    //   : opponentScores[0] - myScores[0] >= 2
    const isOpponentWins = gameMod === 3
      ? opponentScores.filter((num, index) => {
        const tiebreakWinner = num === 7 && myScores[index] === 6
        if ((num > myScores[index]) || tiebreakWinner) {
          return true
        }
      }).length >= 2
      : opponentScores[0] - myScores[0] >= 2 || (opponentScores[0] === 7 && myScores[0] === 6)
    const data: MatchData<CreateMatchSet> = {
      winner: isOpponentWins ? 'opponent' : 'me',
      opponentName,
      duration: totalSeconds,
      sets: gameSets,
    }

    setMatchPaused(true)
    pause()
    navigation.navigate('Winner', { data, pausedMatchId })
    test2(false)

    await storage.remove({ key: 'pausedMatches', id: pausedMatchId?.toString() })
  }

  const saveMatch = async (isOpponentWins: boolean, opponentName: string, sets: CreateMatchSet[], duration: number) => {
    try {
      await matchService
        .create(isOpponentWins, opponentName, gameSets, totalSeconds)
        .then(() => clearState())
        .then(async () => {
          if (pausedMatchId !== undefined) {
            await storage.remove({ key: 'pausedMatches', id: pausedMatchId.toString() })
          }
        })
    } catch (err) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Something went wrong',
        visibilityTime: 2000,
      })
      clearState()
      // return navigation.navigate('Home')
    }
  }

  const finishMatch = async (isUserRetired: boolean) => {
    // setGameSets(prev => [...prev, {
    //   index: currentSet,
    //   myScore: myScores[currentSet],
    //   opponentScore: opponentScores[currentSet],
    //   games,
    // }])
    // setMatchFinish(true)
    // const isOpponentWins = gameMod === 3
    //   ? opponentScores.filter((num, index) => num > myScores[index]).length >= 2
    //   : opponentScores[0] - myScores[0] >= 2
    const isOpponentWins = isUserRetired
    // const isOpponentWins = gameMod === 3
    //   ? opponentScores.filter((num, index) => {
    //     const tiebreakWinner = num === 7 && myScores[index] === 6
    //     if ((num > myScores[index]) || tiebreakWinner) {
    //       return true
    //     }
    //   }).length >= 2
    //  only for early finished matches
    //  : opponentScores[0] > myScores[0] || (opponentScores[0] === 7 && myScores[0] === 6)
    const data: MatchData<CreateMatchSet> = {
      winner: isOpponentWins ? 'opponent' : 'me',
      opponentName,
      duration: totalSeconds,
      sets: [...gameSets, {
        index: currentSet,
        myScore: myScores[currentSet],
        opponentScore: opponentScores[currentSet],
        games,
      }],
    }

    await storage.remove({ key: 'pausedMatches', id: pausedMatchId?.toString() })

    setMatchPaused(true)
    pause()
    navigation.navigate('Winner', { data, pausedMatchId })
    test2(false)
  }

  const pauseMatch = () => {
    setMatchPaused(true)
    pause()
    setShowMatchPopup(false)
    navigation.navigate('Home')
  }

  const pauseMatchV2 = async () => {
  // WARNING
  // const { totalSeconds, start, pause, reset } = useStopwatch({ autoStart: false })
    const data: PausedMatch = {
      opponentName,
      gameMod,
      myGameScore,
      opponentGameScore,
      currentState,
      currentServer,
      drawingWinner,
      currentSet,
      myScores,
      opponentScores,
      isTiebreak,
      tiebreakServeNumber,
      drawingServe,
      currentGame,
      gameStartTime,
      gameHistory,
      games,
      gameSets,
      matchHistory,
      isMatchPaused,
      testMatchFinish,
      matchChangesHistory,
      totalSeconds,
      id: pausedMatchId ? pausedMatchId : Math.floor(Math.random()*(10**16)),
    }

    // const prev = await getItemFromStore(StoreKeys.pausedMatches)
    // await setItemInStore(StoreKeys.pausedMatches, JSON.stringify(newData))
    if (pausedMatchId !== undefined) {
      // setPausedMatchId(undefined)
      try {
        await storage.remove({ key: 'pausedMatches', id: data.id.toString() })
      } catch {}
    }
    await storage.save({ key: 'pausedMatches', id: data.id.toString(), data })
      .catch()
    clearState()
    navigation.navigate('Home')
    setShowMatchPopup(false)
  }

  const continueMatchV2 = async (id: number) => {
    // const prev = await getItemFromStore(StoreKeys.pausedMatches)
    const data = await storage.load({ key: 'pausedMatches', id: id.toString() }).catch() as PausedMatch

    const stopwatchOffset = new Date()
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + data.totalSeconds)
    reset(stopwatchOffset, false)
    start()

    setOpponentName(data.opponentName)
    setGameMod(data.gameMod)
    setMyGameScore(data.myGameScore)
    setOpponentGameScore(data.opponentGameScore)
    setCurrentState(data.currentState)
    setCurrentServer(data.currentServer)
    setDrawingWinner(data.drawingWinner)
    setCurrentSet(data.currentSet)
    setMyScores(data.myScores)
    setOpponentScores(data.opponentScores)
    setTiebreak(data.isTiebreak)
    setTiebreakServeNumber(data.tiebreakServeNumber)
    setDrawingServe(data.drawingServe)
    setCurrentGame(data.currentGame)
    setGameStartTime(new Date(data.gameStartTime))
    setGameHistory(data.gameHistory)
    setGames(data.games)
    setGameSets(data.gameSets)
    setMatchHistory(data.matchHistory)
    setMatchPaused(isMatchPaused)
    setMatchFinish(data.testMatchFinish)
    matchChangesHistory = data.matchChangesHistory
  }

  const continueMatch = () => {
    start()
    setMatchPaused(false)
  }

  const writeGameHistory = (type: string, myScore: number, opponentScore: number) => {
    const serve = type === 'Double fault' ? 2 : drawingServe
    setGameHistory(prev => [
      ...prev,
      {
        myScore,
        opponentScore,
        serve,
        type,
        server: drawingWinner,
      },
    ])
  }

  const writeGame = (gameDuration: number, myScore: number, opponentScore: number) => {
    return new Promise((resolve, reject) => {
      setGames(prev => [
        ...prev,
        {
          index: currentGame,
          duration: gameDuration,
          server: currentServer,
          myScore,
          opponentScore,
          history: gameHistory,
        },
      ])

      resolve({})
    })
  }

  // const increaseOpponentGameScore = (type: string) => {
  //   const opponentIncreaseCount = opponentGameScore === 30 ? 10 : 15
  //   if (isTiebreak) {
  //     return setOpponentScores(prev => {
  //       const newData = [...prev]
  //       newData[currentSet] = newData[currentSet] + 1
  //       return newData
  //     })
  //   }

  //   setOpponentGameScore(prev => {
  //     if (myGameScore === 55) {
  //       writeGameHistory(type, 40, 55)
  //       setMyGameScore(40)
  //       return 55
  //     }

  //     writeGameHistory(type, myGameScore, prev + opponentIncreaseCount)
  //     return prev + opponentIncreaseCount
  //   })
  // }

  // const increaseMyGameScore = (type: string) => {
  //   const myIncreaseCount = myGameScore === 30 ? 10 : 15

  //   if (isTiebreak) {
  //     return setMyScores(prev => {
  //       const newData = [...prev]
  //       newData[currentSet] = newData[currentSet] + 1
  //       return newData
  //     })
  //   }

  //   setMyGameScore(prev => {
  //     if (opponentGameScore === 55) {
  //       writeGameHistory(type, 55, 40)
  //       setOpponentGameScore(40)
  //       return 55
  //     }

  //     writeGameHistory(type, prev + myIncreaseCount, opponentGameScore)
  //     return prev + myIncreaseCount
  //   })
  // }

  const increaseOpponentGameScore = (type: string) => {
    const opponentIncreaseCount = opponentGameScore === 30 ? 10 : 15
    const bothGameSetsEquals6 = myScores[currentSet] === 6 && opponentScores[currentSet] === 6
    if (bothGameSetsEquals6) {
      setTiebreakServeNumber(prev => prev+1)

      if (tiebreakServeNumber >= 2) {
        setTiebreakServeNumber(1)
        setCurrentServer(prev => prev === Player.me ? Player.opponent : Player.me)
      }

      return setOpponentGameScore(prev => {
        writeGameHistory(type, myGameScore, prev+1)
        return prev+1
      })
    } else {
      setOpponentGameScore(prev => {
        if (myGameScore === 55) {
          writeGameHistory(type, 40, 40)
          setMyGameScore(40)
          return 40
        }

        writeGameHistory(type, myGameScore, prev + opponentIncreaseCount)
        return prev + opponentIncreaseCount
      })
    }
  }

  const increaseMyGameScore = (type: string) => {
    const myIncreaseCount = myGameScore === 30 ? 10 : 15
    const bothGameSetsEquals6 = myScores[currentSet] === 6 && opponentScores[currentSet] === 6

    if (bothGameSetsEquals6) {
      setTiebreakServeNumber(prev => prev + 1)

      if (tiebreakServeNumber >= 2) {
        setTiebreakServeNumber(1)
        setCurrentServer(prev => prev === Player.me ? Player.opponent : Player.me)
      }

      return setMyGameScore(prev => {
        writeGameHistory(type, prev + 1, opponentGameScore)
        return prev+1
      })
    } else {
      setMyGameScore(prev => {
        if (opponentGameScore === 55) {
          writeGameHistory(type, 40, 40)
          setOpponentGameScore(40)
          return 40
        }

        writeGameHistory(type, prev + myIncreaseCount, opponentGameScore)
        return prev + myIncreaseCount
      })
    }
  }

  const setGameScore = (winner: Player, type: string) => {
    if (winner === Player.opponent) {
      increaseOpponentGameScore(type)
    } else if (winner === Player.me) {
      increaseMyGameScore(type)
    }

    // WARNING!!!!!!!
    // addToMatchHistory()
    return setCurrentState(GameStates.drawing)
  }

  useEffect(() => {
    const gameDuration = Math.floor((+(new Date()) - +gameStartTime) / 1000)
    const gameSetScoreDiff = Math.abs(myScores[currentSet] - opponentScores[currentSet]) >= 2
    const bothGameSetsMoreThan6 = myScores[currentSet] >= 6 && opponentScores[currentSet] >= 6
    const bothGameSetsEquals6 = myScores[currentSet] === 6 && opponentScores[currentSet] === 6
    // const moreThan40 = myGameScore >= 40 || opponentGameScore >= 40
    const oneOfPlayersIsAD = myGameScore >= 55 || opponentGameScore >= 55
    const scoreDiff = Math.abs(myGameScore - opponentGameScore) > 20
    const isGameFinished =
      // (moreThan40 && scoreDiff)
      (oneOfPlayersIsAD && scoreDiff)
      || (isTiebreak && (myGameScore >= 7
        || opponentGameScore >= 7) && Math.abs(myGameScore - opponentGameScore) >= 2)

    if (isGameFinished) {
      if (myGameScore > opponentGameScore) {
        writeGame(gameDuration, myScores[currentSet]+1, opponentScores[currentSet])
          .then(() => setMyScores(prev => {
            const newData = [...prev]
            newData[currentSet] = newData[currentSet] + 1
            return newData
          }))
      } else {
        writeGame(gameDuration, myScores[currentSet], opponentScores[currentSet]+1)
          .then(() => setOpponentScores(prev => {
            const newData = [...prev]
            newData[currentSet] = newData[currentSet] + 1
            return newData
          }))
      }

      setGameHistory([])
      setCurrentGame(prev => prev + 1)
      setMyGameScore(0)
      setOpponentGameScore(0)
      setCurrentServer(prev => {
        return prev === Player.me ? Player.opponent : Player.me
      })
      setGameStartTime(new Date())
    }

    if (bothGameSetsEquals6) {
      setTiebreak(true)
    }

    if (bothGameSetsMoreThan6 && gameSetScoreDiff) {
      setTiebreak(false)
    }
  }, [currentGame, myGameScore, opponentGameScore])

  useEffect(() => {
    const gameSetScoreDiff = Math.abs(myScores[currentSet] - opponentScores[currentSet]) >= 2
    const oneGameSetMoreThan6 = myScores[currentSet] >= 6 || opponentScores[currentSet] >= 6
    const isOpponentWins = gameMod === 3
      ? opponentScores.filter((num, index) => {
        const tiebreakWinner = num === 7 && myScores[index] === 6
        if ((num > myScores[index]) || tiebreakWinner) {
          return true
        }
      }).length >= 2
      : opponentScores[0] - myScores[0] >= 2 || (opponentScores[0] === 7 && myScores[0] === 6)
    const isUserWins = gameMod === 3
      ? myScores.filter((num, index) => {
        const tiebreakWinner = num === 7 && opponentScores[index] === 6
        if ((num > opponentScores[index]) || tiebreakWinner) {
          return true
        }
      }).length >= 2
      : myScores[0] - opponentScores[0] >= 2 || (opponentScores[0] === 6 && myScores[0] === 7)
    const isMatchFinished = (isUserWins || isOpponentWins) && oneGameSetMoreThan6
    const isOpponentTiebreakWinner = opponentScores[currentSet] === 7 && myScores[currentSet] === 6
    const isUserTiebreakWinner = myScores[currentSet] === 7 && opponentScores[currentSet] === 6
    const isSetFinished = oneGameSetMoreThan6
      && (gameSetScoreDiff || (isOpponentTiebreakWinner || isUserTiebreakWinner))

    if (isSetFinished) {
      setGameSets(prev => {
        const newData = [...prev, {
          index: currentSet,
          myScore: myScores[currentSet],
          opponentScore: opponentScores[currentSet],
          games,
        }]

        return newData
      })

      if (isMatchFinished) {
        // setMatchFinish(true)
        // goToWinner()
        test2(true)
      }

      setCurrentGame(0)
      setMyGameScore(0)
      setOpponentGameScore(0)
      setCurrentSet(prev => prev + 1)
      setTiebreak(false)
      setGames([])
    }
  }, [myScores, opponentScores, currentSet, gameSets])

  useEffect(() => {
    if (test1) {
      goToWinner()
    }
  }, [test1])

  const matchContextValue: MatchContextData = {
    opponentName,
    setOpponentName,
    newOpponentName,
    setNewOpponentName,
    currentState,
    setCurrentState,
    myGameScore,
    setMyGameScore,
    opponentGameScore,
    setOpponentGameScore,
    currentServer,
    setCurrentServer,
    drawingWinner,
    setDrawingWinner,
    currentSet,
    setCurrentSet,
    myScores,
    setMyScores,
    opponentScores,
    setOpponentScores,
    isTiebreak,
    setGameScore,
    setDrawingServe,
    gameMod,
    setGameMod,
    matchDuration: totalSeconds,
    startMatch,
    undo,
    showMatchPopup,
    setShowMatchPopup,
    finishMatch,
    cancelMatch,
    matchHistory,
    isMatchPaused,
    pauseMatch,
    continueMatch,
    testMatchFinish,
    clearState,
    launchMatch,
    undoFirstServer,
    addToMatchHistory,
    matchChangesHistory,
    pauseMatchV2,
    continueMatchV2,
    cancelMatchV2,
    setPausedMatchId,
    pausedMatchId,
    storage,
  }

  return (
    <MatchContext.Provider value={matchContextValue}>
      {children}
    </MatchContext.Provider>
  )
}
