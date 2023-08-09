import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { CheckboxContainer } from './styles'
import { Icon } from '../Icon'


interface CheckboxProps extends TouchableOpacityProps {
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, ...rest }) => {
  return (
    <CheckboxContainer
      isChecked={isChecked}
      {...rest}
    >
      {
        isChecked && <Icon name="confirm" size={12} color="#fff" />
      }
    </CheckboxContainer>
  )
}

export default Checkbox
