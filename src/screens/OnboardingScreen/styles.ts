import { Dimensions, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import COLORS from '../../styles/colors'
import { h1 } from '../../styles/mixins'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export const SlideContainer = styled.View`
  width: ${width}px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 32px;
`

export const SlideHeader = styled.Text`
  ${h1}
  text-align: center;
`

export const IndicatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: absolute;
  top: 16px;
  width: 100%;
`

export const IndicatorDot = styled.View<{ skipped?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: ${({ skipped }) => skipped ? COLORS.primary : COLORS.bgGrey};
  margin: 4px;
`

export const ActiveIndicatorDotWrap = styled.View`
  width: 84px;
  height: 6px;
  border-radius: 100px;
  background-color: ${COLORS.bgGrey};
  justify-content: center;
  align-items: flex-start;
  margin: 4px;
`

export const ActiveIndicatorDot = styled.View`
  width: 42px;
  height: 6px;
  border-radius: 100px;
  background-color: ${COLORS.primary};
`

export const SkipButtonText = styled.Text`
  color: gray;
  font-weight: bold;
`

export const StartButton = styled.TouchableOpacity`
  padding: 12px 24px;
  background-color: green;
  border-radius: 24px;
  margin: 16px;
`

export const StartButtonText = styled.Text`
  color: white;
  font-weight: bold;
`
