import ButtonComponent from '../../../components/UI/Button'
import { styles, ButtonsBlock } from '../../../components/UI/Container'
import { FinalImageContainer } from '../styles'
import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedNavigationProps } from '../../../navigation/UnauthenticatedNavigation'
import { Header2 } from '../../../styles/typography'
import { Illustration } from '../../../components/UI/Illustration'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'


const PasswordRecoveryFinalScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <FinalImageContainer>
          <Illustration name="password-restored" />
          <Header2>Password restored!</Header2>
        </FinalImageContainer>
        <ButtonsBlock>
          <ButtonComponent
            title="Done"
            onPress={() => navigation.navigate('Login')}
          />
        </ButtonsBlock>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PasswordRecoveryFinalScreen
