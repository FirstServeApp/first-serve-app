import COLORS from '../../../styles/colors'
import { TextS } from '../../../styles/typography'
import SocialBtn from '../Button/SocialBtn'
import { SocialBtnsContainer, SocialSigninContainer } from './styles'
import * as WebBrowser from 'expo-web-browser'
import { useAuth } from '../../../context/AuthContext'


WebBrowser.maybeCompleteAuthSession()

const SocialSigninBtns = () => {
  const { googleSignin, facebookSignin, appleSigin } = useAuth()

  return (
    <SocialSigninContainer>
      <TextS color={COLORS.darkGrey}>Sign in with your accounts</TextS>
      <SocialBtnsContainer>
        <SocialBtn icon="google" onPress={googleSignin} />
        <SocialBtn icon="facebook" onPress={facebookSignin} />
        <SocialBtn
          icon="apple"
          onPress={appleSigin} />
      </SocialBtnsContainer>
    </SocialSigninContainer>
  )
}

export default SocialSigninBtns
