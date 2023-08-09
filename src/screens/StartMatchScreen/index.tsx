import ButtonComponent from '../../components/UI/Button'
import { TextS } from '../../styles/typography'
import { Container, TextContainer, SettingsBlock, ButtonsBlock } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import COLORS from '../../styles/colors'
import ListButton from '../../components/UI/ListButton'
import ListCheckboxBtn from '../../components/UI/ListButton/ListCheckboxBtn'
import { useAuth } from '../../context/AuthContext'
import { useMatch } from '../../context/MatchContext'


const StartMatchScreen: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { user } = useAuth()
  const { opponentName, gameMod, setGameMod, startMatch } = useMatch()

  return (
    <Container>
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
          <TextS color={COLORS.darkGrey}>What game?</TextS>
        </TextContainer>
        <ListCheckboxBtn
          type="radio"
          title="1 set with a tiebreak up to 7 points"
          isChecked={gameMod === 1}
          onPress={() => setGameMod(1)}
        />
        <ListCheckboxBtn
          type="radio"
          title="3 set with a tiebreak up to 7 points"
          isChecked={gameMod === 3}
          onPress={() => setGameMod(3)}
        />
      </SettingsBlock>
      <ButtonsBlock>
        <ButtonComponent
          title="Start on Apple Watch"
          size="M"
        />
        <ButtonComponent
          title="Start on iPhone"
          type="secondary"
          size="M"
          onPress={() => startMatch()}
        />
      </ButtonsBlock>
    </Container>
  )
}

export default StartMatchScreen
