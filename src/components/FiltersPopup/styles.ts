import styled from 'styled-components/native'
import COLORS from '../../styles/colors'


export const FiltersPopupContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
`

export const HeaderWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`

export const SelectDateContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: ${COLORS.lightGray};
`
