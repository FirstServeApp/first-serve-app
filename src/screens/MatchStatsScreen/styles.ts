import styled from 'styled-components/native'
import COLORS from '../../styles/colors'


export const Container = styled.SafeAreaView`
  /* width: 100%; */
  /* height: 100%; */
  background: ${COLORS.bgGrey};
  /* flex-direction: column; */
  /* align-items: center; */
  flex: 1;
`

export const CardBlockContainer = styled.View`
  padding: 16px 16px 24px;
`

export const StatsBlockContainer = styled.View`
  /* width: 100%; */
  background: white;
  padding: 0 16px 16px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  flex: 1;
`
