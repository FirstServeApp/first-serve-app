import React from 'react'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { ButtonContainer, IconContainer } from './styles'
import { TextS, TextL } from '../../../styles/typography'
import { Icon } from '../Icon'
import { IconsNames } from '../Icon'
import COLORS from '../../../styles/colors'


export interface BtnProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'opponent';
  size?: 'S' | 'M';
  icon?: IconsNames;
  loading?: boolean;
}

const ButtonComponent: React.FC<BtnProps> = ({
  title, disabled, type = 'primary', icon, size = 'S', loading = false, ...rest
}) => {
  return (
    <ButtonContainer
      title={title}
      disabled={disabled || loading}
      type={type}
      size={size}
      {...rest}
    >
      {loading && (
        <ActivityIndicator size="small" color={COLORS.darkPrimary} />
      )}
      {(icon && !loading) && (
        <IconContainer>
          <Icon name={icon} size={24} />
        </IconContainer>
      )}
      {(size === 'S' && !loading) && <TextS color={type === 'opponent' ? 'white' : COLORS.black}>{title}</TextS>}
      {(size === 'M' && !loading) && <TextL color={type === 'opponent' ? 'white' : COLORS.black}>{title}</TextL>}
    </ButtonContainer>
  )
}

export default ButtonComponent
