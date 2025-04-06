import { useNavigation } from '@react-navigation/native'
import { TextL, TextS } from '../../styles/typography'
import NavigationLink from '../UI/Button/NavigationLink'
import { Icon } from '../UI/Icon'
import {
  MatchCardContainer,
  MatchCardBottomSection,
  TopRow,
  BottomRow,
  TopScoreBlock,
  BottomScoreBlock,
  TopCell,
  BottomCell,
  TopIconCell,
  BottomIconCell,
} from './styles'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import { TouchableOpacity } from 'react-native'
import { GetAllSet, Match, Set } from '../../services/matchService'
import { getMatchDate, getMatchDuration, getValidScoreValue } from '../../utils/matchUtils'
import { memo, useCallback } from 'react'


type Props = {
  data: Match<GetAllSet | Set>;
  userName?: string;
  showTime?: boolean;
  showDate?: boolean;
  gameMod?: number;
}

const MatchCard: React.FC<Props> = ({ data, showTime = false, showDate = true, gameMod = 3, userName }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const isOpponentWins = data.winner.toLowerCase() === 'opponent'
  const { myScores, opponentScores } = getValidScoreValue(data)

  return (
    <TouchableOpacity
      disabled={showTime}
      onPress={() => navigation.navigate('MatchStats', { matchId: data._id })}
    >
      <MatchCardContainer>
        <TopRow>
          <TextL>{userName|| 'You'}</TextL>
          <TopScoreBlock>
            <TopIconCell>
              {!isOpponentWins && <Icon name="crown" />}
            </TopIconCell>
            <TopCell last={data.sets.length === 1}>
              <TextL additional>{myScores[0] || '·'}</TextL>
            </TopCell>
            {data.sets.length > 1 && <TopCell>
              <TextL additional>{myScores[1] || '·'}</TextL>
            </TopCell>}
            {data.sets.length > 1 && <TopCell last>
              <TextL additional>{myScores[2] || '·'}</TextL>
            </TopCell>}
          </TopScoreBlock>
        </TopRow>
        <BottomRow>
          <TextL>{data.opponentName || 'Opponent'}</TextL>
          <BottomScoreBlock>
            <BottomIconCell>
              {isOpponentWins && <Icon name="crown" />}
            </BottomIconCell>
            <BottomCell last={data.sets.length === 1}>
              <TextL additional>{opponentScores[0] || '·'}</TextL>
            </BottomCell>
            {data.sets.length > 1 &&<BottomCell>
              <TextL additional>{opponentScores[1] || '·'}</TextL>
            </BottomCell>}
            {data.sets.length > 1 &&<BottomCell last>
              <TextL additional>{opponentScores[2] || '·'}</TextL>
            </BottomCell>}
          </BottomScoreBlock>
        </BottomRow>
      </MatchCardContainer>
      <MatchCardBottomSection>
        {showDate
          ? <TextS additional>{getMatchDate(data.createdAt)}</TextS>
          : <TextS additional>
            {gameMod === 1 ? 'Single set (tiebreak to 7)' : 'Best of 3 sets (tiebreak to 7)'}
          </TextS>
        }
        {showTime
          ? <TextS additional>Time: {getMatchDuration(data.duration)}</TextS>
          : <NavigationLink title="Details" disabled />
        }
      </MatchCardBottomSection>
    </TouchableOpacity>
  )
}

// export default memo(
//   MatchCard,
//   (prev, next) => {
//     return (prev.data._id === next.data._id) && (prev.data.opponentName === next.data.opponentName)
//   },
// )
// export default memo(MatchCard, (prev, next) => prev.data.opponentName === next.data.opponentName)
export default MatchCard
