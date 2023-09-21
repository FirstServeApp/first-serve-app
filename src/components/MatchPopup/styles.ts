import styled from 'styled-components/native'


export const MatchPopupContainer = styled.View<{ bottomInset?: number }>`
flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  padding-bottom: ${({bottomInset}) => bottomInset}px;
`

export const HeaderBlock = styled.View`
  width: 100%;
`

export const HeaderWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const ConfirmSubtitleWrap = styled.View`
  width: 100%;
  margin-bottom: 24px;
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
  width: 50%;
`
