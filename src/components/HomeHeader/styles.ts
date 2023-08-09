import styled from 'styled-components/native'


export const HomeHeaderContainer = styled.View`
  width: 100%;
  padding: 16px;
  padding-top: 40px; /* DELTETE */
  background: white;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const LeftContentBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const UserInfoWrap = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 48px;
`
