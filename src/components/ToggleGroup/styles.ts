import styled from 'styled-components/native'
import COLORS from '../../styles/colors'


export const ToggleGroupContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
`

export const Driver = styled.View`
  width: 100%;
  height: 1px;
  background: ${COLORS.bgGrey};
  /* margin-top: 16px; */
`

export const ButtonsBlock = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`

export const BtnWrap = styled.TouchableOpacity`
  padding: 24px 0 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BtnUnderline = styled.View`
  width: 100%;
  height: 2px;
  background: ${COLORS.black};
  position: absolute;
  bottom: 0;
`
