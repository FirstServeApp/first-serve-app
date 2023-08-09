import React from 'react'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { SocialIcon, SocialIconsNames } from '../Icon/SocialIcon'


export interface BtnProps extends TouchableOpacityProps {
  disabled?: boolean;
  icon: SocialIconsNames;
}

const SocialBtn: React.FC<BtnProps> = ({ disabled, icon, ...rest }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...rest}
    >
      <SocialIcon name={icon} />
    </TouchableOpacity>
  )
}

export default SocialBtn
