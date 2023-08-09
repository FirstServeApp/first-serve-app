import styled from 'styled-components/native'
import COLORS from '../../styles/colors'


export const ButtonGroupContainer = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 18px;
  border-width: 1px;
  border-color: ${COLORS.bgGrey};
  margin: 16px 0;
`

export const TabWrap = styled.TouchableOpacity<{ selected: boolean }>`
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;
  background: ${({ selected }) => selected ? COLORS.primary : 'transparent'};
  border-radius: 18px;
  flex-grow: 1;
`
