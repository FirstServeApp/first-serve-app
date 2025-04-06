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
import { PausedMatch, Player, useMatch } from '../../context/MatchContext'
import Badge from '../UI/Badge'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'


type PausedMatchCardProps = {
  data: PausedMatch
}

const PausedMatchCard: React.FC<PausedMatchCardProps> = memo(({ data }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  // const [matches, setMatches] = useState<any[] | []>([])
  const { setPausedMatchId } = useMatch()
  // const { myScores, opponentScores, opponentName, gameMod, isMatchPaused } = useMatch()

  const getScore = (index: number, player: Player, myScores: number[], opponentScores: number[]) => {
    if (!myScores || !opponentScores) {
      return '+'
    }
    if (myScores[index] === 0 && opponentScores[index] === 0) {
      return '·'
    } else if (player === Player.me) {
      return myScores[index].toString()
    } else {
      return opponentScores[index].toString()
    }
  }

  // useEffect(() => {
  //   const loadMatches = async () => {
  //     const data = await storage.getAllDataForKey('pausedMatches')
  //     // const data = await getItemFromStore(StoreKeys.pausedMatches)
  //     // const matches = JSON.parse(data)
  //     if (data) {
  //       setMatches(data)
  //     }
  //   }
  //   loadMatches()
  // }, [])

  // if (matches?.length === 0 || !matches) {
  //   return null
  // }

  // const sorted = matches?.sort((a, b) => {
  //   return new Date(a.gameStartTime).getSeconds() - new Date(b.gameStartTime).getSeconds()
  // })

  return (
    <View onStartShouldSetResponder={() => true}>
      <TouchableOpacity
        key={data.id}
        onPress={() => {
          setPausedMatchId(data.id)
          navigation.navigate('Match', { pausedMatchId: data.id })
        }}
      >
        <MatchCardContainer>
          <TopRow>
            <TextL>You</TextL>
            <TopScoreBlock>
              <TopCell last={data.gameSets.length <= 1}>
                <TextL additional>{getScore(0, Player.me, data.myScores, data.opponentScores)}</TextL>
              </TopCell>
              {data.gameMod === 3 && <TopCell>
                <TextL additional>{getScore(1, Player.me, data.myScores, data.opponentScores)}</TextL>
              </TopCell>}
              {data.gameMod === 3 && <TopCell last>
                <TextL additional>{getScore(2, Player.me, data.myScores, data.opponentScores)}</TextL>
              </TopCell>}
            </TopScoreBlock>
          </TopRow>
          <BottomRow>
            <TextL>{data.opponentName || 'Opponent'}</TextL>
            <BottomScoreBlock>
              <BottomCell last={data.gameSets.length <= 1}>
                <TextL additional>{getScore(0, Player.opponent, data.myScores, data.opponentScores)}</TextL>
              </BottomCell>
              {data.gameMod === 3 && <BottomCell>
                <TextL additional>{getScore(1, Player.opponent, data.myScores, data.opponentScores)}</TextL>
              </BottomCell>}
              {data.gameMod === 3 && <BottomCell last>
                <TextL additional>{getScore(2, Player.opponent, data.myScores, data.opponentScores)}</TextL>
              </BottomCell>}
            </BottomScoreBlock>
          </BottomRow>
        </MatchCardContainer>
        <MatchCardBottomSection>
          <Badge title="Match paused" />

          <NavigationLink title="Continue" disabled />
        </MatchCardBottomSection>
      </TouchableOpacity>
    </View>
  )
})

export default PausedMatchCard
