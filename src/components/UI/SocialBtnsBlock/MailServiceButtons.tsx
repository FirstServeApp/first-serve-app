import COLORS from '../../../styles/colors'
import { TextS } from '../../../styles/typography'
import SocialBtn from '../Button/SocialBtn'
import { SocialBtnsContainer, SocialSigninContainer } from './styles'
import openEmailApp from '../../../utils/mailUtils'


const MailServiceButtons = () => {
  return (
    <SocialSigninContainer>
      <TextS color={COLORS.darkGrey}>Go to email</TextS>
      <SocialBtnsContainer>
        <SocialBtn icon="gmail" onPress={() => openEmailApp('gmail')} />
        <SocialBtn icon="outlook" onPress={() => openEmailApp('outlook')} />
        <SocialBtn icon="yahoo" onPress={() => openEmailApp('yahoo')} />
      </SocialBtnsContainer>
    </SocialSigninContainer>
  )
}

export default MailServiceButtons
