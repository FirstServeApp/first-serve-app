import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'


export const Container = styled.View`
  width: 100%;
  background: white;
  flex-direction: column;
  flex: 1;
  padding: 16px;
`

export const ButtonsBlock = styled.View`
  padding: 16px;
  gap: 16px;
  position: absolute;
  bottom: 16px;
  right: 0;
  left: 0;
`

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    padding: 16,
  },
})
