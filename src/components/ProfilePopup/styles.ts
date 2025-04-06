import styled from 'styled-components/native'


export const ProfilePopupContainer = styled.View<{ bottomInset: number }>`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  padding-bottom: ${props => `${props.bottomInset}px`};
`

export const ProfileInfoContainer = styled.View`
  width: 100%;
  margin-top: 32px;
`

export const BottomBtnContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`

export const BtnsListContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 32px;
`
