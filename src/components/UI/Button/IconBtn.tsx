import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { IconBtnContainer } from './styles'
import { Icon } from '../Icon'
import { IconsNames } from '../Icon'
import COLORS from '../../../styles/colors'


export interface IconBtnProps extends TouchableOpacityProps {
  disabled?: boolean;
  icon: IconsNames;
  type?: 'light' | 'dark' | 'black';
}

const IconBtn: React.FC<IconBtnProps> = ({ disabled, icon, type = 'dark', ...rest }) => {
  return (
    <IconBtnContainer
      disabled={disabled}
      type={type}
      {...rest}
    >
      <Icon name={icon} color={type === 'black' ? 'white' : COLORS.black} />
    </IconBtnContainer>
  )
}

export default IconBtn
