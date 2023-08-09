import styled from 'styled-components/native'
import COLORS from '../../../styles/colors'


export const BadgeWrap = styled.View`
  padding: 4px 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background: ${COLORS.lightOrange};
  border-radius: 10px;
`
