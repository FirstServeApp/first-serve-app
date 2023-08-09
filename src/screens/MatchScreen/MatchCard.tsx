import { memo, useCallback } from 'react'
import { TextL, TextS } from '../../styles/typography'
import { Icon } from '../../components/UI/Icon'
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
import { View } from 'react-native'
import { Player, useMatch } from '../../context/MatchContext'
import COLORS from '../../styles/colors'
import { useAuth } from '../../context/AuthContext'
import { getMatchDuration } from '../../utils/matchUtils'


const MatchCard: React.FC = memo(() => {
  const { opponentName, myGameScore, opponentGameScore, currentServer, myScores,
    opponentScores, currentSet, matchDuration } = useMatch()
  const { user } = useAuth()
  const getGameScore = useCallback((player: 'me' | 'opponent') => {
    switch (player === 'me' ? myGameScore : opponentGameScore) {
      case 0:
        return '00'
      case 55:
        return 'AD'
      default:
        return player === 'me' ? myGameScore : opponentGameScore
    }
  }, [myGameScore, opponentGameScore])

  return (
    <View>
      <MatchCardContainer>
        <TopRow>
          <TextL>
            {user?.name || 'You'}
          </TextL>
          <TopScoreBlock>
            <TopIconCell>
              {currentServer === Player.me && <Icon name="logo" size={16} />}
            </TopIconCell>
            <TopCell>
              <TextL additional color={COLORS.black}>{getGameScore('me')}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{myScores[0]}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{currentSet >= 1 ? myScores[1] : '·'}</TextL>
            </TopCell>
            <TopCell>
              <TextL additional>{currentSet >= 2 ? myScores[2] : '·'}</TextL>
            </TopCell>
          </TopScoreBlock>
        </TopRow>
        <BottomRow>
          <TextL>{opponentName || 'Opponent'}</TextL>
          <BottomScoreBlock>
            <BottomIconCell>
              {currentServer === Player.opponent && <Icon name="logo" size={16} />}
            </BottomIconCell>
            <BottomCell>
              <TextL additional color={COLORS.black}>{getGameScore('opponent')}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{opponentScores[0]}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{currentSet >= 1 ? opponentScores[1] : '·'}</TextL>
            </BottomCell>
            <BottomCell>
              <TextL additional>{currentSet >= 2 ? opponentScores[2] : '·'}</TextL>
            </BottomCell>
          </BottomScoreBlock>
        </BottomRow>
      </MatchCardContainer>
      <MatchCardBottomSection>
        <TextS additional>Best of 3: Tiebreak Sets</TextS>
        <TextS additional>Time: {getMatchDuration(matchDuration)}</TextS>
      </MatchCardBottomSection>
    </View>
  )
})

export default MatchCard
