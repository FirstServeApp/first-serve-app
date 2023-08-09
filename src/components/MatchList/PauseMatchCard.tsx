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
import { getMatchDate, getMatchDuration } from '../../utils/matchUtils'
import { useMatch } from '../../context/MatchContext'
import Badge from '../UI/Badge'


const PauseMatchCard: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { myScores, opponentScores, opponentName, isMatchPaused } = useMatch()

  if (!isMatchPaused) {
    return null
  }

  return (
    <View>
      <MatchCardContainer>
        <TopRow>
          <TextL>You</TextL>
          <TopScoreBlock>
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
          <TextL>{opponentName || 'Opponent'}</TextL>
          <BottomScoreBlock>
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
        <Badge title="Match paused" />

        <NavigationLink title="Continue" onPress={() => navigation.navigate('Match')} />
      </MatchCardBottomSection>
    </View>
  )
}

export default PauseMatchCard
