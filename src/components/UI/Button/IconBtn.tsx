/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { IconBtnContainer } from './styles'
import { Icon } from '../Icon'
import { IconsNames } from '../Icon'
import COLORS from '../../../styles/colors'


export interface IconBtnProps extends TouchableOpacityProps {
  disabled?: boolean;
  icon: IconsNames;
  type?: 'light' | 'dark' | 'black' | 'flat';
}

const IconBtn: React.FC<IconBtnProps> = ({ disabled, icon, type = 'dark', ...rest }) => {
  if (type === 'flat') {
    return (
      <TouchableOpacity disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }} {...rest}>
        <Icon name={icon} disabled={disabled} />
      </TouchableOpacity>
    )
  }

  return (
    <IconBtnContainer
      disabled={disabled}
      type={type}
      {...rest}
    >
      <Icon name={icon} color={type === 'black' ? 'white' : COLORS.black} disabled={disabled} />
    </IconBtnContainer>
  )
}

export default IconBtn
