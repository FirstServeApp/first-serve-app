import React from 'react'
import { Svg, Path, Circle } from 'react-native-svg'
import COLORS from '../../../styles/colors'
import { IconBtnContainer } from './styles'
import { TouchableOpacityProps } from 'react-native'


interface IconProps extends TouchableOpacityProps{
  disabled?: boolean;
  size?: number;
  isFilterApplied?: boolean;
}

export const FilterIconButton: React.FC<IconProps> = ({
  isFilterApplied = false,
  size = 24,
  disabled = false,
  ...rest
}) => {
  return (
    <IconBtnContainer
      disabled={disabled}
      type="light"
      {...rest}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 6H21M7 12H17M11 18H13"
          stroke={COLORS.black}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {isFilterApplied && (
          <Circle r="5" fill={COLORS.red} cx="19" cy="5" />
        )}
      </Svg>
    </IconBtnContainer>
  )
}
