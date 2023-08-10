import styled from 'styled-components/native'
import COLORS from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  background: white;
`

export const ChooseFromContactsHeader = styled.View`
  background: ${COLORS.lightGray};
  padding: 0 16px 16px;
`

export const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 16px;
  right: 0;
  padding: 16px;
`
