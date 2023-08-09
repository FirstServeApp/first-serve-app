import { Switch } from 'react-native'
import COLORS from '../../../styles/colors'


const BtnSwitch = () => {
  return (
    <Switch
      thumbColor="#fff"
      trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: COLORS.darkPrimary }}
    />
  )
}

export default BtnSwitch
