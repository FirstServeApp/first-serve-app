import styled from 'styled-components/native'
import { h3 } from '../../styles/mixins'


export const MatchPopupContainer = styled.View<{ bottomInset?: number }>`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  padding-bottom: ${({bottomInset}) => bottomInset || 0 + 16}px;
`

export const HeaderBlock = styled.View`
  width: 100%;
  padding-bottom: 24px;
`

export const HeaderWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`

export const ConfirmPopupHeader = styled.Text`
  ${h3}
  max-width: 80%;
`

export const BtnsListContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const PopupBtnsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`

export const PopupBtn = styled.View`
  flex: 1;
`
