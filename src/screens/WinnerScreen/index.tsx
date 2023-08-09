import ButtonComponent from '../../components/UI/Button'
import { Header2 } from '../../styles/typography'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import { ButtonContainer, IllustrationContainer, Container } from './styles'
import { Illustration } from '../../components/UI/Illustration'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions, Share, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { useEffect, useState } from 'react'
import matchService, { Match, Set } from '../../services/matchService'
import MatchCard from '../../components/MatchList/MatchCard'
import Loader from '../../components/UI/Loader'
import Toast from 'react-native-toast-message'
import { getShareText } from '../../utils/matchUtils'
import { useAuth } from '../../context/AuthContext'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'Winner'>

const WinnerScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<Match<Set>>()
  const { user } = useAuth()

  const saveMatch = () => {
    setLoading(true)
    const getMatches = async () => {
      const { isOpponentWins, opponentName, gameSets, totalSeconds } = route.params
      const res = await matchService.create(isOpponentWins, opponentName, gameSets, totalSeconds)
      setData(res.data)
    }

    getMatches()
      .catch(() => {
        Toast.show({
          type: 'tomatoToast',
          text1: 'Something went wrong',
          visibilityTime: 2000,
        })
        navigation.navigate('Home')
      })
      .finally(() => setLoading(false))
  }

  const onShare = async (matchData?: Match<Set>, userName?: string) => {
    if (matchData && userName) {
      await Share.share({
        message: getShareText(matchData, userName),
        title: '🎾 Match Result 🎾',
      })
    }
  }

  useEffect(() => {
    saveMatch()
  }, [])

  if (!data || isLoading) {
    return <Loader />
  }

  return (
    <Container>
      {!route.params.isOpponentWins && (
        <ConfettiCannon
          count={100}
          origin={{ x: Dimensions.get('screen').width * 0.5, y: Dimensions.get('screen').height * 0.75 }}
          fallSpeed={2500}
          explosionSpeed={250}
          fadeOut
        />
      )}
      <View>
        <IllustrationContainer>
          <Illustration name={route.params.isOpponentWins ? 'loser' : 'winner'} />
          {route.params.isOpponentWins ? (
            <Header2>Opponent wins</Header2>
          ) : (
            <Header2>You&#x2019;re the winner!</Header2>
          )}
        </IllustrationContainer>
        <MatchCard data={data} showDate={false} />
      </View>
      <ButtonContainer>
        <ButtonComponent
          title="Done"
          size="M"
          onPress={() => navigation.navigate('Home')}
        />
        <ButtonComponent
          title="Share results"
          icon="share"
          type="secondary"
          size="M"
          onPress={() => onShare(data, user?.name || 'Me')}
        />
      </ButtonContainer>
    </Container>
  )
}

export default WinnerScreen
