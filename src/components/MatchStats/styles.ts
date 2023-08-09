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

export const MatchStatsCard = styled.View`
  width: 100%;
  background: white;
  border-width: 1px;
  border-radius: 18px;
  border-color: ${COLORS.bgGrey};
`

export const StatsBlock = styled.View`
  width: 100%;
  flex: 1;
  padding: 16px;
`

export const MatchStatsCardRow = styled.View<{ last?: boolean }>`
  width: 100%;
  border-bottom-width: ${({ last }) => last ? 0 : '1px'};
  border-color: ${COLORS.bgGrey};;
  align-items: center;
  padding: 16px 0;
`

export const LegendBlock = styled.View`
  width: 100%;
  max-width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const ImportantStatBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;;
  gap: 16px;
`

export const MatchStatSmallCard = styled.View`
  background: white;
  border-width: 1px;
  border-radius: 18px;
  border-color: ${COLORS.bgGrey};
  padding: 16px 8px 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 12px;
`

export const MatchStatSmallCardText = styled.Text`
  ${textSmall}
  text-align: center;
`
