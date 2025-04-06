/* eslint-disable react-native/no-inline-styles */
import ButtonComponent from '../../components/UI/Button'
import { Header2 } from '../../styles/typography'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import { ButtonContainer, IllustrationContainer, Container } from './styles'
import { Illustration } from '../../components/UI/Illustration'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import matchService, { Match, Set } from '../../services/matchService'
import MatchCard from '../../components/MatchList/MatchCard'
import Loader from '../../components/UI/Loader'
import { getShareText } from '../../utils/matchUtils'
import { useAuth } from '../../context/AuthContext'
import { useMatch } from '../../context/MatchContext'
import { useState } from 'react'
import Share, { ShareOptions } from 'react-native-share'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'Winner'>

const WinnerScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { clearState, gameMod, storage, setPausedMatchId, pausedMatchId } = useMatch()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const { data } = route.params
  data.sets.filter(val => val.games.length > 0)
  const isOpponentWins = data.winner.toLowerCase() === 'opponent'

  const onShare = async (matchData?: Match<Set>, userName?: string) => {
    if (matchData && userName) {
      const message = getShareText(matchData, userName)
      const options: ShareOptions = {
        activityItemSources: [
          {
            placeholderItem: { type: 'text', content: message },
            item: {
              default: { type: 'text', content: message },
              message: null, // Specify no text to share via Messages app.
            },
            linkMetadata: {
              title: '🎾 Match Result 🎾',
            },
          },
        ],
      }
      await Share.open(options)
    }
  }

  const saveMatch = async () => {
    setLoading(true)
    // try {
    try {
      const d = data
      d.sets = data.sets.filter(val => val.games.length > 0)
      if (d.sets) {
        // Promise.all([
        // await matchService.create(isOpponentWins, d.opponentName, d.sets, d.duration),
        // await storage.remove({
        //   key: 'pausedMatches',
        //   id: (pausedMatchId?.toString() || route.params.pausedMatchId?.toString()),
        // }),
        // ])
        await matchService.create(isOpponentWins, d.opponentName, d.sets, d.duration)
        // .then(() => clearState())
        // .then(() => navigation.navigate('Home'))
        // .finally(() => {
        //   setLoading(false)
        //   navigation.navigate('Home')
        // })
      }
    } catch {
      clearState()
    } finally {
      setLoading(false)
      navigation.navigate('Home')
    }
    // await matchService
    //   .create(isOpponentWins, d.opponentName, d.sets, d.duration)
    //   .then(async () => {
    //     if (pausedMatchId) {
    //       await storage.remove({
    //         key: 'pausedMatches',
    //         id: (pausedMatchId.toString() || route.params.pausedMatchId?.toString()),
    //       })
    //     }
    //     setPausedMatchId(undefined)
    //   })
    //   .then(() => clearState())
    //   .then(() => navigation.navigate('Home'))
    //   .finally(() => {
    //     setLoading(false)
    //     navigation.navigate('Home')
    //   })
    // } catch (err) {
    //   console.log('42 ', err)
    //   Toast.show({
    //     type: 'tomatoToast',
    //     text1: 'Something went wrong',
    //     visibilityTime: 2000,
    //   })
    //   clearState()
    // } finally {
    //   setLoading(false)
    //   navigation.navigate('Home')
    // }
  }

  if (!data) {
    return <Loader />
  }

  const s2 = data.sets as Set[]
  const d: Match<Set> = {
    _id: '',
    user_id: '',
    winner: data.winner,
    opponentName: data.opponentName,
    duration: data.duration,
    sets: s2,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  }

  return (
    <Container>
      <View style={{ width: '100%', padding: 16 }}>
        <IllustrationContainer>
          <Illustration name={isOpponentWins ? 'loser' : 'winner'} />
          {isOpponentWins ? (
            <Header2>Opponent wins</Header2>
          ) : (
            <Header2>You&#x2019;re the winner!</Header2>
          )}
        </IllustrationContainer>
        <MatchCard data={d} showDate={false} gameMod={gameMod} showTime />
      </View>
      <ButtonContainer>
        <ButtonComponent
          title="Done"
          size="M"
          loading={loading}
          onPress={saveMatch}
        />
        <ButtonComponent
          title="Share results"
          icon="share"
          type="secondary"
          size="M"
          onPress={() => onShare(d, user?.name || 'Me')}
        />
      </ButtonContainer>
      {!isOpponentWins && (
        <ConfettiCannon
          count={100}
          origin={{ x: Dimensions.get('screen').width * 0.5, y: Dimensions.get('screen').height * 0.75 }}
          fallSpeed={2500}
          explosionSpeed={250}
          fadeOut
        />
      )}
    </Container>
  )
}

export default WinnerScreen
