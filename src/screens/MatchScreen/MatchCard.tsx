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
  PlayerSection,
  PlayerIndicator,
} from './styles'
import { View } from 'react-native'
import { Player, useMatch } from '../../context/MatchContext'
import COLORS from '../../styles/colors'
import { useAuth } from '../../context/AuthContext'
import { getMatchDuration } from '../../utils/matchUtils'


const makeShorter = new RegExp(/(.{8})..+/)

const MatchCard: React.FC = memo(() => {
  const { opponentName, myGameScore, opponentGameScore, currentServer, myScores,
    opponentScores, currentSet, matchDuration, gameMod } = useMatch()
  const { user } = useAuth()
  const getGameScore = useCallback((player: 'me' | 'opponent') => {
    switch (player === 'me' ? myGameScore : opponentGameScore) {
      case 0:
        return '00'
      case 55:
        return 'AD'
      case 70:
        return 'AD'
      default:
        return player === 'me' ? myGameScore : opponentGameScore
    }
  }, [myGameScore, opponentGameScore])

  return (
    <View>
      <MatchCardContainer>
        <TopRow>
          <PlayerSection>
            <PlayerIndicator color={COLORS.primary} />
            <TextL>
              {user?.name.replace(makeShorter, '$1…') || 'You'}
            </TextL>
          </PlayerSection>
          <TopScoreBlock>
            <TopIconCell>
              {currentServer === Player.me && <Icon name="logo" size={16} strokeWidth={2} />}
            </TopIconCell>
            <TopCell>
              <TextL additional color={COLORS.black}>{getGameScore('me')}</TextL>
            </TopCell>
            <TopCell last={gameMod === 1}>
              <TextL additional>{myScores[0]}</TextL>
            </TopCell>
            {gameMod === 3 && <TopCell>
              <TextL additional>{currentSet >= 1 ? myScores[1] : '·'}</TextL>
            </TopCell>}
            {gameMod === 3 && <TopCell last>
              <TextL additional>{currentSet >= 2 ? myScores[2] : '·'}</TextL>
            </TopCell>}
          </TopScoreBlock>
        </TopRow>
        <BottomRow>
          <PlayerSection>
            <PlayerIndicator color={COLORS.red} />
            <TextL>{opponentName.replace(makeShorter, '$1…') || 'Opponent'}</TextL>
          </PlayerSection>
          <BottomScoreBlock>
            <BottomIconCell>
              {currentServer === Player.opponent && <Icon name="logo" size={16} />}
            </BottomIconCell>
            <BottomCell>
              <TextL additional color={COLORS.black}>{getGameScore('opponent')}</TextL>
            </BottomCell>
            <BottomCell last={gameMod === 1}>
              <TextL additional>{opponentScores[0]}</TextL>
            </BottomCell>
            {gameMod === 3 && <BottomCell>
              <TextL additional>{currentSet >= 1 ? opponentScores[1] : '·'}</TextL>
            </BottomCell>}
            {gameMod === 3 && <BottomCell last>
              <TextL additional>{currentSet >= 2 ? opponentScores[2] : '·'}</TextL>
            </BottomCell>}
          </BottomScoreBlock>
        </BottomRow>
      </MatchCardContainer>
      <MatchCardBottomSection>
        <TextS additional>Best of {gameMod}: Tiebreak Sets</TextS>
        <TextS additional>Time: {getMatchDuration(matchDuration) || '0s'}</TextS>
      </MatchCardBottomSection>
    </View>
  )
})

export default MatchCard
