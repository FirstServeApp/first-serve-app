import { TextS } from '../../styles/typography'
import {
  MatchHistoryCard,
  MatchHistoryCardHeader,
  HistoryBlock,
  MatchHistoryCardRow,
  LeftBlock,
  RightBlock,
} from './styles'
import { Game } from '../../services/matchService'
import COLORS from '../../styles/colors'
import { getMatchDuration } from '../../utils/matchUtils'


const getValidScore = (score: number) => {
  switch (score) {
    case 0:
      return '00'
    case 55:
      return 'AD'
    default:
      return score
  }
}

const getValidServe = (serve: string) => {
  if (serve === 'Winner' || serve === 'Ace' || serve === 'Return winner') {
    return <TextS color={COLORS.blue}>{serve}</TextS>
  } else if (serve === 'Forced error' || serve === 'Unforced error' || serve === 'Double fault') {
    return <TextS color={COLORS.orange}>{serve}</TextS>
  } else {
    return <TextS>{serve}</TextS>
  }
}

const getValidServer = (winner: string) => {
  if (winner === 'ME') {
    return 'You'
  } else {
    return 'Opponent'
  }
}

type Props = {
  games: Game[];
}

const HistoryCard: React.FC<Props> = ({ games }) => {
  return (
    <>
      {games.map((game, index) => (
        <MatchHistoryCard key={index}>
          <MatchHistoryCardHeader>
            <LeftBlock>
              <TextS>Game {index + 1}</TextS>
              <TextS color={COLORS.darkGrey}>Time: {getMatchDuration(game.duration)}</TextS>
            </LeftBlock>
            <RightBlock>
              <TextS color={COLORS.primary}>{game.myScore}</TextS>
              <TextS> - </TextS>
              <TextS color={COLORS.red}>{game.opponentScore}</TextS>
            </RightBlock>
          </MatchHistoryCardHeader>
          <HistoryBlock>
            <MatchHistoryCardRow>
              <RightBlock>
                <TextS color={COLORS.primary}>00</TextS>
                <TextS> - </TextS>
                <TextS color={COLORS.red}>00</TextS>
              </RightBlock>
              <RightBlock>
                <TextS color={COLORS.darkGrey}>Serving  </TextS>
                <TextS>{getValidServer(game.server)}</TextS>
              </RightBlock>
            </MatchHistoryCardRow>
            {game.history.map((item, index, arr) => {
              if (arr.length === index + 1) {
                return (
                  <MatchHistoryCardRow key={index} last>
                    <TextS>Game  </TextS>
                    <RightBlock>
                      <TextS color={COLORS.darkGrey}>{item.serve}S  </TextS>
                      {getValidServe(item.type)}
                      <TextS>  {getValidServer(item.server)}</TextS>
                    </RightBlock>
                  </MatchHistoryCardRow>
                )
              }

              return (
                <MatchHistoryCardRow key={index}>
                  <RightBlock>
                    <TextS color={COLORS.primary}>{getValidScore(item.myScore)}</TextS>
                    <TextS> - </TextS>
                    <TextS color={COLORS.red}>{getValidScore(item.opponentScore)}</TextS>
                  </RightBlock>
                  <RightBlock>
                    <TextS color={COLORS.darkGrey}>{item.serve}S  </TextS>
                    {getValidServe(item.type)}
                    <TextS>  {getValidServer(item.server)}</TextS>
                  </RightBlock>
                </MatchHistoryCardRow>
              )
            })}
          </HistoryBlock>
        </MatchHistoryCard>
      ))}
    </>
  )
}

export default HistoryCard
