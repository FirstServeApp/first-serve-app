import styled from 'styled-components/native'
import COLORS from '../../styles/colors'
import { textSmall } from '../../styles/mixins'


const getTextAlign = (center?: boolean, right?: boolean) => {
  if (center) {
    return 'center'
  } else if (right) {
    return 'right'
  } else {
    return 'left'
  }
}

export const MatchHistoryList = styled.View`
  margin-top: 16px;
  gap: 16px;
`

export const MatchHistoryCard = styled.View`
  width: 100%;
  background: white;
  border-width: 1px;
  border-radius: 18px;
  border-color: ${COLORS.bgGrey};
`

export const MatchHistoryCardHeader = styled.View`
  width: 100%;
  background: ${COLORS.lotion};
  border-bottom-width: 1px;
  border-color: ${COLORS.bgGrey};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 24px;
`

export const HistoryBlock = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`

export const MatchHistoryCardRow = styled.View<{ last?: boolean }>`
  width: 100%;
  border-bottom-width: ${({ last }) => last ? 0 : '1px'};
  border-color: ${COLORS.bgGrey};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 0;
  gap: 24px;
`

export const LeftBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`

export const RightBlock = styled.View`
  flex-direction: row;
  align-items: center;
`

export const LegendText = styled.Text<{ alignCenter?: boolean, alignRight?: boolean }>`
  ${textSmall}
  width: 33%;
  text-align: ${({ alignCenter, alignRight }) => getTextAlign(alignCenter, alignRight)};
`

export const ProgressBlockWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 8px;
`

export const ProgressBlock = styled.View`
  flex: 0.5;
`

export const EmptyHistoryContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 100%;
  padding-top: 48px;
`
