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
import { View } from 'react-native'
import { GetAllSet, Match, Set } from '../../services/matchService'
import { getMatchDate, getMatchDuration, getValidScoreValue } from '../../utils/matchUtils'
import { useAuth } from '../../context/AuthContext'


type Props = {
  data: Match<GetAllSet | Set>;
  showTime?: boolean;
  showDate?: boolean;
}

const MatchCard: React.FC<Props> = ({ data, showTime = false, showDate = true }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { user } = useAuth()
  const isOpponentWins = data.winner.toLowerCase() === 'opponent'
  const { myScores, opponentScores } = getValidScoreValue(data)
  console.log(myScores)

  return (
    <View>
      <MatchCardContainer>
        <TopRow>
          <TextL>{user?.name || 'You'}</TextL>
          <TopScoreBlock>
            <TopIconCell>
              {!isOpponentWins && <Icon name="crown" />}
            </TopIconCell>
            <TopCell>
              <TextL additional>{myScores[0] || '·'}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{myScores[1] || '·'}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{myScores[2] || '·'}</TextL>
            </TopCell>
          </TopScoreBlock>
        </TopRow>
        <BottomRow>
          <TextL>{data.opponentName || 'Opponent'}</TextL>
          <BottomScoreBlock>
            <BottomIconCell>
              {isOpponentWins && <Icon name="crown" />}
            </BottomIconCell>
            <BottomCell>
              <TextL additional>{opponentScores[0] || '·'}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{opponentScores[1] || '·'}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{opponentScores[2] || '·'}</TextL>
            </BottomCell>
          </BottomScoreBlock>
        </BottomRow>
      </MatchCardContainer>
      <MatchCardBottomSection>
        {showDate
          ? <TextS additional>{getMatchDate(data.createdAt)}</TextS>
          : <TextS additional>Best of 3: Tiebreak Sets</TextS>
        }
        {showTime
          ? <TextS additional>Time: {getMatchDuration(data.duration)}</TextS>
          : <NavigationLink title="Details" onPress={() => navigation.navigate('MatchStats', { matchId: data._id })} />
        }
      </MatchCardBottomSection>
    </View>
  )
}

export default MatchCard
