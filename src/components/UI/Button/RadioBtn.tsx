import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { RadioBtnContainer } from './styles'
import { Icon } from '../Icon'
import COLORS from '../../../styles/colors'


interface RadioBtnProps extends TouchableOpacityProps {
  isChecked: boolean;
}

const RadioBtn: React.FC<RadioBtnProps> = ({ isChecked, ...rest }) => {
  return (
    <RadioBtnContainer
      isChecked={isChecked}
      {...rest}
    >
      {
        isChecked && <Icon name="fill" size={16} color={COLORS.darkPrimary} />
      }
    </RadioBtnContainer>
  )
}

export default RadioBtn
