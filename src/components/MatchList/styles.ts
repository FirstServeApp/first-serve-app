import styled from 'styled-components/native'
import COLORS from '../../styles/colors'
import { textLarge } from '../../styles/mixins'


const { bgGrey, darkGrey } = COLORS

export const MatchCardContainer = styled.View`
  width: 100%;
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
  width: 100%;
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

export const FilterBlock = styled.View`
  width: 100%;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

export const MatchListContainer = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 0 16px;
  margin-top: 16px;
  gap: 16px;
  margin-bottom: 112px;  /* DELETE (maybe) */
`

export const NoMatchesContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const NoMatchesIllustrationWrap = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`

export const NoMatchesSubtitle = styled.Text`
  ${textLarge}
  width: 100%;
  color: ${darkGrey};
  text-align: center;
`
