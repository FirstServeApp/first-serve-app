import styled from 'styled-components/native'
import COLORS from '../../styles/colors'
import { StyleSheet } from 'react-native'


export const Container = styled.View`
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
  padding: 0 16px 24px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
})
