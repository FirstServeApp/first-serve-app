import styled from 'styled-components/native'
import COLORS from '../../../styles/colors'


export const ToastMessageWrap = styled.View`
  width: 100%;
  padding-horizontal: 16px;
`

export const ToastMessageContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 18px;
  background: ${COLORS.red};
  gap: 8px;
`
