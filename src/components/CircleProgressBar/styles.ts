import styled from 'styled-components/native'
import { textSmall } from '../../styles/mixins'
import COLORS from '../../styles/colors'

export const TextInfoWrap = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`

export const Subtitle = styled.Text`
  ${textSmall}
  width: 100%;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  color: ${COLORS.darkGrey};
`
