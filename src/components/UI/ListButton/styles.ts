import styled from 'styled-components/native'
import COLORS from '../../../styles/colors'


export const ListButtonWrap = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: ${COLORS.lightGray};
`

export const ListCheckboxButtonWrap = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: ${COLORS.lightGray};
`

export const LeftBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const LeftIconWrap = styled.View<{ background?: string }>`
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 14px;
  background: ${({ background }) => background ? background : COLORS.lightGray};
`

export const Badge = styled.View`
  background: ${COLORS.bgGrey};
  padding: 8px;
  border-radius: 10px;
`
