/* eslint-disable react-native/no-inline-styles */
import ButtonComponent from '../../components/UI/Button'
import { Header2 } from '../../styles/typography'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import { ButtonContainer, IllustrationContainer, Container } from './styles'
import { Illustration } from '../../components/UI/Illustration'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions, Share, View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { Match, Set } from '../../services/matchService'
import MatchCard from '../../components/MatchList/MatchCard'
import Loader from '../../components/UI/Loader'
import { getShareText } from '../../utils/matchUtils'
import { useAuth } from '../../context/AuthContext'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'Winner'>

const WinnerScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { user } = useAuth()
  const { data } = route.params
  const isOpponentWins = data.winner.toLowerCase() === 'opponent'

  const onShare = async (matchData?: Match<Set>, userName?: string) => {
    if (matchData && userName) {
      await Share.share({
        message: getShareText(matchData, userName),
        title: '🎾 Match Result 🎾',
      })
    }
  }

  if (!data) {
    return <Loader />
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
        <MatchCard data={data} showDate={false} showTime />
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
