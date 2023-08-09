import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { TextS } from '../../../styles/typography'
import { NavigationLinkContainer } from './styles'
import { Icon } from '../Icon'


interface Props extends TouchableOpacityProps {
  title: string;
}

const NavigationLink: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <NavigationLinkContainer {...rest}>
      <TextS additional>{title}</TextS>
      <Icon name="chevron-right" />
    </NavigationLinkContainer>
  )
}

export default NavigationLink
