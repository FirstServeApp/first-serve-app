import styled from 'styled-components/native'
import COLORS from '../../styles/colors'
import { Dimensions, StyleSheet } from 'react-native'


const { bgGrey } = COLORS


export const Container = styled.View`
  flex: 1;
`

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: bgGrey,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

export const TopBlockWrap = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ButtonContainer = styled.View<{ bottomInset: number }>`
  width: 100%;
  padding: 16px;
  padding-bottom: ${({ bottomInset }) => `${bottomInset}px`};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background: white;
  gap: 16px;
`

export const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`

export const CardBlockContainer = styled.View`
  padding: 16px 16px 24px;
`

export const MatchCardContainer = styled.View`
  width: ${Dimensions.get('window').width - 32}px;
  height: 120px;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background: white;
`

export const MatchCardBottomSection = styled.View`
  width: ${Dimensions.get('window').width - 32}px;
  height: 48px;
  padding: 0 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${bgGrey};
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  background: white;
`

export const TopRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${bgGrey};
`

export const BottomRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TopScoreBlock = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding-top: 8px;
`

export const BottomScoreBlock = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 8px;
`

export const TopCell = styled.View`
  width: 40px;
  padding-top: 8px;
  padding-bottom: 16px;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
  border-left-color: ${bgGrey};
`

export const BottomCell = styled.View`
  width: 40px;
  padding-top: 16px;
  padding-bottom: 8px;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
  border-left-color: ${bgGrey};
`

export const TopIconCell = styled.View`
  width: 40px;
  padding-top: 8px;
  padding-bottom: 16px;
  justify-content: center;
  align-items: center;
`

export const BottomIconCell = styled.View`
  width: 40px;
  padding-top: 16px;
  padding-bottom: 8px;
  justify-content: center;
  align-items: center;
`
