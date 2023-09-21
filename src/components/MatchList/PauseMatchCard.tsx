import { useNavigation } from '@react-navigation/native'
import { TextL } from '../../styles/typography'
import NavigationLink from '../UI/Button/NavigationLink'
import {
  MatchCardContainer,
  MatchCardBottomSection,
  TopRow,
  BottomRow,
  TopScoreBlock,
  BottomScoreBlock,
  TopCell,
  BottomCell,
} from './styles'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import { View } from 'react-native'
import { Player, useMatch } from '../../context/MatchContext'
import Badge from '../UI/Badge'


const PauseMatchCard: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { myScores, opponentScores, opponentName, isMatchPaused } = useMatch()

  const getScore = (index: number, player?: Player) => {
    if (myScores[index] === 0 && opponentScores[index] === 0) {
      return '·'
    } else if (player === Player.me) {
      return myScores[index].toString()
    } else {
      return opponentScores[index].toString()
    }
  }

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
              <TextL additional>{getScore(0, Player.me)}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{getScore(1, Player.me)}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{getScore(2, Player.me)}</TextL>
            </TopCell>
          </TopScoreBlock>
        </TopRow>
        <BottomRow>
          <TextL>{opponentName || 'Opponent'}</TextL>
          <BottomScoreBlock>
            <BottomCell>
              <TextL additional>{getScore(0, Player.opponent)}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{getScore(1, Player.opponent)}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{getScore(2, Player.opponent)}</TextL>
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
