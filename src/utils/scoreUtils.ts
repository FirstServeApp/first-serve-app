import { useMatch } from '../context/MatchContext'


export const setGameScore = (isOpponentWins: boolean) => {
  const { myGameScore, setMyGameScore, opponentGameScore, setOpponentGameScore } = useMatch()

  if (isOpponentWins) {
    const opponentIncreaseCount = opponentGameScore === 30 ? 10 : 15
    setOpponentGameScore(prev => prev + opponentIncreaseCount)
  } else {
    const myIncreaseCount = myGameScore === 30 ? 10 : 15
    setMyGameScore(prev => prev + myIncreaseCount)
  }
}
