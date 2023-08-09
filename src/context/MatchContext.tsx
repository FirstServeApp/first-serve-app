import { useNavigation } from '@react-navigation/native'
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AuthenticatedNavigationProps } from '../navigation/AuthenticatedNavigation'
import { CreateMatchSet, Game, GameHistory } from '../services/matchService'
import { useStopwatch } from 'react-timer-hook'


export enum GameStates {
  firstServe = 'FIRST_SERVE',
  drawing = 'DRAWING',
  gameFirstStep = 'GAME_FIRST_STEP',
  gameSecondStep = 'GAME_SECOND_STEP',
}

export enum Player {
  me = 'ME',
  opponent = 'OPPONENT',
}

export type MatchContextData = {
  opponentName: string;
  setOpponentName(value: string): void;
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
  matchHistory: any[];
  isMatchPaused: boolean;
  pauseMatch(): void;
  continueMatch(): void;
}

const MatchContext = createContext<MatchContextData>({} as MatchContextData)

export const useMatch = (): MatchContextData => {
  const context = useContext(MatchContext)

  if (!context) {
    throw new Error('useMatch must be used within an MatchProvider')
  }

  return context
}

export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [opponentName, setOpponentName] = useState('Opponent')
  const [gameMod, setGameMod] = useState<number>(1)
  const [myGameScore, setMyGameScore] = useState<number>(0)
  const [opponentGameScore, setOpponentGameScore] = useState<number>(0)
  const [currentState, setCurrentState] = useState<GameStates>(GameStates.firstServe)
  const [currentServer, setCurrentServer] = useState<Player>(Player.me)
  const [drawingWinner, setDrawingWinner] = useState<Player>(Player.me)
  const [currentSet, setCurrentSet] = useState<number>(0)
  const [myScores, setMyScores] = useState<number[]>([0, 0, 0])
  const [opponentScores, setOpponentScores] = useState<number[]>([0, 0, 0])
  const [isTiebreak, setTiebreak] = useState(false)
  const [drawingServe, setDrawingServe] = useState<number>(1)
  const [currentGame, setCurrentGame] = useState<number>(0)
  const { totalSeconds, start, pause, reset } = useStopwatch({ autoStart: true })
  const [gameStartTime, setGameStartTime] = useState<Date>(new Date())
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [gameSets, setGameSets] = useState<CreateMatchSet[]>([])
  const [matchHistory, setMatchHistory] = useState<any[]>([])
  const [showMatchPopup, setShowMatchPopup] = useState(false)
  const [isMatchPaused, setMatchPaused] = useState(false)

  const addToMatchHistory = (data: any) => {
    setMatchHistory(prev => {
      const newData = [...prev]
      newData.push(data)
      return newData
    })
  }

  const undo = () => {
    if (matchHistory.length > 0) {
      const index = matchHistory.length >= 2 ? matchHistory.length - 2 : 0
      const info = matchHistory[index]
      setMyGameScore(info.myGameScore)
      setOpponentGameScore(info.opponentGameScore)
      setCurrentState(info.currentState)
      setCurrentServer(info.currentServer)
      setDrawingWinner(info.drawingWinner)
      setCurrentSet(info.currentSet)
      setMyScores(info.myScores)
      setOpponentScores(info.opponentScores)
      setTiebreak(info.isTiebreak)
      setDrawingServe(info.drawingServe)
      setCurrentGame(info.currentGame)
      setGameStartTime(info.gameStartTime)
      setGameHistory(info.gameHistory)
      setGames(info.games)
      setGameSets(info.gameSets)
      setMatchHistory(prev => {
        const newData = [...prev]
        newData.pop()
        return newData
      })
    }
  }

  const clearState = () => {
    setMyGameScore(0)
    setOpponentGameScore(0)
    setCurrentState(GameStates.firstServe)
    setCurrentServer(Player.me)
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
    reset()
    setMatchHistory([])
    setShowMatchPopup(false)
    setMatchPaused(false)
  }

  const startMatch = () => {
    reset()
    clearState()
    setGameStartTime(new Date())
    navigation.navigate('Match')
  }

  const cancelMatch = () => {
    clearState()
    navigation.navigate('Home')
  }

  const finishMatch = (isUserRetired: boolean) => {
    const isOpponentWins = gameMod === 3
      ? opponentScores.filter((num, index) => num > myScores[index]).length >= 2
      : opponentScores[0] - myScores[0] >= 2

    navigation.navigate('Winner', { isOpponentWins: isOpponentWins || isUserRetired,
      opponentName, gameSets, totalSeconds })

    return clearState()
  }

  const pauseMatch = () => {
    setMatchPaused(true)
    pause()
    setShowMatchPopup(false)
    navigation.navigate('Home')
  }

  const continueMatch = () => {
    start()
    setMatchPaused(false)
  }

  const writeGameHistory = useCallback((type: string, myScore: number, opponentScore: number) => {
    setGameHistory(prev => [
      ...prev,
      {
        myScore,
        opponentScore,
        serve: drawingServe,
        type,
        server: drawingWinner,
      },
    ])
  }, [drawingWinner, drawingServe])

  const writeGame = useCallback((gameDuration: number, myScore: number, opponentScore: number) => {
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
  }, [currentGame, currentServer, gameHistory])

  const increaseOpponentGameScore = useCallback((type: string) => {
    const opponentIncreaseCount = opponentGameScore === 30 ? 10 : 15
    if (isTiebreak) {
      return setOpponentScores(prev => {
        const newData = [...prev]
        newData[currentSet] = newData[currentSet] + 1
        return newData
      })
    }

    setOpponentGameScore(prev => {
      if (myGameScore === 55) {
        writeGameHistory(type, 40, 55)
        setMyGameScore(40)
        return 55
      }

      writeGameHistory(type, myGameScore, prev + opponentIncreaseCount)
      return prev + opponentIncreaseCount
    })
  }, [isTiebreak, myGameScore])

  const increaseMyGameScore = useCallback((type: string) => {
    const myIncreaseCount = myGameScore === 30 ? 10 : 15

    if (isTiebreak) {
      return setMyScores(prev => {
        const newData = [...prev]
        newData[currentSet] = newData[currentSet] + 1
        return newData
      })
    }

    setMyGameScore(prev => {
      if (opponentGameScore === 55) {
        writeGameHistory(type, 55, 40)
        setOpponentGameScore(40)
        return 55
      }

      writeGameHistory(type, myGameScore, prev + myIncreaseCount)
      return prev + myIncreaseCount
    })
  }, [isTiebreak, opponentGameScore])

  const setGameScore = useCallback((winner: Player, type: string) => {
    if (winner === Player.opponent) {
      increaseOpponentGameScore(type)
    } else if (winner === Player.me) {
      increaseMyGameScore(type)
    }

    return setCurrentState(GameStates.drawing)
  }, [])

  useEffect(() => {
    const gameDuration = Math.floor((+(new Date()) - +gameStartTime) / 1000)
    const gameSetScoreDiff = Math.abs(myScores[currentSet] - opponentScores[currentSet]) >= 2
    const bothGameSetsMoreThan6 = myScores[currentSet] >= 6 && opponentScores[currentSet] >= 6
    const bothGameSetsEquals6 = myScores[currentSet] === 6 && opponentScores[currentSet] === 6
    const moreThan40 = myGameScore >= 40 || opponentGameScore >= 40
    const scoreDiff = Math.abs(myGameScore - opponentGameScore) > 20
    const isGameFinished = (moreThan40 && scoreDiff)

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
    const isSetFinished = oneGameSetMoreThan6 && gameSetScoreDiff
    const isOpponentWins = gameMod === 3
      ? opponentScores.filter((num, index) => num > myScores[index]).length >= 2
      : opponentScores[0] - myScores[0] >= 2
    const isUserWins = gameMod === 3
      ? myScores.filter((num, index) => num > opponentScores[index]).length >= 2
      : myScores[0] - opponentScores[0] >= 2
    const isMatchFinished = (isUserWins || isOpponentWins) && oneGameSetMoreThan6

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

      setCurrentGame(0)
      setCurrentSet(prev => prev + 1)
      setMyGameScore(0)
      setOpponentGameScore(0)

      if (isMatchFinished) {
        navigation.navigate('Winner', { isOpponentWins, opponentName, gameSets, totalSeconds })
        return clearState()
      }
    }
  }, [myScores, opponentScores, currentSet])

  useEffect(() => {
    addToMatchHistory({
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
    })
  }, [myGameScore,
    opponentGameScore,
    myScores,
    opponentScores,
    isTiebreak,
    currentState,
    currentServer])

  const matchContextValue: MatchContextData = {
    opponentName,
    setOpponentName,
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
  }

  return (
    <MatchContext.Provider value={matchContextValue}>
      {children}
    </MatchContext.Provider>
  )
}
