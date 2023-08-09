import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 16px;
  background: white;
`

export const TextContainer = styled.View<{ marginTop?: boolean }>`
  margin-top: ${({ marginTop }) => marginTop ? '38px' : 0};
  margin-bottom: 16px;
`

export const SettingsBlock = styled.View``

export const ButtonsBlock = styled.View`
  gap: 12px;
`
