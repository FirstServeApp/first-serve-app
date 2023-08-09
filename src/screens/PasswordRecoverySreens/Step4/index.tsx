import ButtonComponent from '../../../components/UI/Button'
import { Container } from '../../../components/UI/Container'
import { ButtonsBlock, FinalImageContainer } from '../styles'
import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedNavigationProps } from '../../../navigation/UnauthenticatedNavigation'
import { Header2 } from '../../../styles/typography'
import { Illustration } from '../../../components/UI/Illustration'


const PasswordRecoveryFinalScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()

  return (
    <Container>
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
    </Container>
  )
}

export default PasswordRecoveryFinalScreen
