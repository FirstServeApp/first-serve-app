import styled from 'styled-components/native'
import COLORS from '../../styles/colors'


export const HomeContainer = styled.SafeAreaView`
  background: ${COLORS.bgGrey};
  flex-direction: column;
  align-items: center;
  flex: 1;
`

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
`
