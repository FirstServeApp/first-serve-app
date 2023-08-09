import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 16px;
  background: white;
`

export const TextContainer = styled.View`
  margin-bottom: 4px; /* FIXME: I need to fix input's styles, because now input has 12px margin top */
`

export const SettingsBlock = styled.View``

export const ButtonsBlock = styled.View`
  gap: 12px;
`
