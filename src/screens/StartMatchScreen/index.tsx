import ButtonComponent from '../../components/UI/Button'
import { TextS } from '../../styles/typography'
import { TextContainer, SettingsBlock } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import COLORS from '../../styles/colors'
import ListButton from '../../components/UI/ListButton'
import ListCheckboxBtn from '../../components/UI/ListButton/ListCheckboxBtn'
import { useAuth } from '../../context/AuthContext'
import { useMatch } from '../../context/MatchContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, ButtonsBlock } from '../../components/UI/Container'
import { useEffect } from 'react'
import { sendMessage, getIsPaired, getReachability } from 'react-native-watch-connectivity'
import Toast from 'react-native-toast-message'


const StartMatchScreen: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { user } = useAuth()
  const { opponentName, gameMod, setGameMod, setOpponentName, clearState } = useMatch()

  useEffect(() => {
    setOpponentName('Opponent')
  }, [])

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <SettingsBlock>
        <TextContainer>
          <TextS color={COLORS.darkGrey}>Who&#x2019;s playing?</TextS>
        </TextContainer>
        <ListButton
          title={user?.name || 'You'}
          leftIcon="fill"
          leftIconBg={COLORS.primary}
          disabled
        />
        <ListButton
          title={opponentName || 'Opponent'}
          leftIcon="fill"
          leftIconBg={COLORS.red}
          showRightChevron
          onPress={() => navigation.navigate('PlayerDetails')}
        />
        <TextContainer marginTop>
          <TextS color={COLORS.darkGrey}>Match format</TextS>
        </TextContainer>
        <ListCheckboxBtn
          type="radio"
          title="Single set (tiebreak to 7)"
          isChecked={gameMod === 1}
          onPress={() => setGameMod(1)}
        />
        <ListCheckboxBtn
          type="radio"
          title="Best of 3 sets (tiebreak to 7)"
          isChecked={gameMod === 3}
          onPress={() => setGameMod(3)}
        />
      </SettingsBlock>
      <ButtonsBlock>
        <ButtonComponent
          title="Start on Apple Watch"
          size="M"
          onPress={async () => {
            const isPaired = await getIsPaired()
            if (isPaired && await getReachability()) {
              sendMessage(
                { test: `test-${Math.random().toFixed(2)}` },
              )
            } else {
              return Toast.show({
                type: 'tomatoToast',
                text1: 'Open First Serve on your Apple Watch',
                visibilityTime: 2000,
              })
            }
          }}
        />
        <ButtonComponent
          title="Start on iPhone"
          type="secondary"
          size="M"
          onPress={() => {
            // startMatch()
            clearState()
            navigation.navigate('Match')
          }}
        />
      </ButtonsBlock>
    </SafeAreaView>
  )
}

export default StartMatchScreen
