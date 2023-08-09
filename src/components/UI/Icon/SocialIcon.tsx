import React from 'react'
import COLORS from '../../../styles/colors'
// Social Icons
import Google from '../../../assets/Icons/social/Google.svg'
import Facebook from '../../../assets/Icons/social/Facebook.svg'
import Apple from '../../../assets/Icons/social/Apple.svg'
import Gmail from '../../../assets/Icons/social/Gmail.svg'
import Outlook from '../../../assets/Icons/social/Outlook.svg'
import Yahoo from '../../../assets/Icons/social/Yahoo!.svg'


export type SocialIconsNames = 'google' | 'facebook' | 'apple' | 'gmail' | 'outlook' | 'yahoo'

interface SocialIconProps {
  name: SocialIconsNames;
  size?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ name, size=32 }) => {
  switch (name) {
    case 'google':
      return <Google width={size} height={size} />
    case 'facebook':
      return <Facebook width={size} height={size} />
    case 'apple':
      return <Apple width={size} height={size} fill={COLORS.black} />
    case 'gmail':
      return <Gmail width={size} height={size} />
    case 'outlook':
      return <Outlook width={size} height={size} />
    case 'yahoo':
      return <Yahoo width={size} height={size} />
    default:
      return null
  }
}
