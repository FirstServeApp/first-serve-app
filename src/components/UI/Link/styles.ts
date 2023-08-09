import styled from 'styled-components/native'
import { textSmall } from '../../../styles/mixins'
import COLORS from '../../../styles/colors'


export const LinkText = styled.Text<{ color?: string }>`
  ${textSmall}
  color: ${({ color }) => color ? color : COLORS.blue};
`
