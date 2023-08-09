import Toast, { ToastConfig } from 'react-native-toast-message'
import { ToastMessageContainer, ToastMessageWrap } from './styles'
import { TextS } from '../../../styles/typography'
import { Icon } from '../Icon'


const toastConfig: ToastConfig = {
  tomatoToast: ({ text1 }) => (
    <ToastMessageWrap>
      <ToastMessageContainer>
        <Icon name="alert" color="white" size={20} />
        <TextS color="white">{text1}</TextS>
      </ToastMessageContainer>
    </ToastMessageWrap>
  ),
}

const ToastMessage = () => <Toast config={toastConfig} />

export default ToastMessage
