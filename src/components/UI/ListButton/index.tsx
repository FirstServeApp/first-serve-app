import React from 'react'
import {
  ListButtonWrap,
  LeftBlock,
  LeftIconWrap,
  Badge,
} from './styles'
import { Icon, IconsNames } from '../Icon'
import { TextL, TextS } from '../../../styles/typography'
import { TouchableOpacityProps } from 'react-native'
import NavigationLink from '../Button/NavigationLink'
import COLORS from '../../../styles/colors'


const getListIconColor = (LeftIconBg?: string, dangerZone?: boolean): string => {
  if (LeftIconBg) {
    return 'transparent'
  } else if (dangerZone) {
    return COLORS.red
  } else {
    return COLORS.black
  }
}

interface Props extends TouchableOpacityProps {
  title: string;
  leftIcon?: IconsNames;
  leftIconBg?: string;
  rightText?: string;
  showRightChevron?: boolean;
  dangerZone?: boolean;
  showBadge?: boolean;
  badgeText?: string;
}

const ListButton: React.FC<Props> = ({
  title, leftIcon, rightText, showRightChevron, leftIconBg, dangerZone = false, badgeText, showBadge, ...rest
}) => {
  return (
    <ListButtonWrap {...rest}>
      <LeftBlock>
        {leftIcon && (
          <LeftIconWrap background={leftIconBg}>
            <Icon name={leftIcon} color={getListIconColor(leftIconBg, dangerZone)} />
          </LeftIconWrap>
        )}
        <TextL color={dangerZone ? COLORS.red : COLORS.black}>{title}</TextL>
      </LeftBlock>
      {rightText && <NavigationLink disabled title={rightText} />}
      {showRightChevron && <Icon name="chevron-right" />}
      {showBadge && (
        <Badge>
          <TextS additional color={badgeText ? COLORS.black : COLORS.darkGrey}>{badgeText || 'Select date'}</TextS>
        </Badge>
      )}
    </ListButtonWrap>
  )
}

export default ListButton
