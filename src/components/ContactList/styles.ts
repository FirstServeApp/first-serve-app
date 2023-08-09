import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'


export const SectionTitleWrap = styled.View`
  width: 100%;
  margin: 16px 0;
`

export const styles = StyleSheet.create({
  contactListContainer: {
    paddingHorizontal: 16,
  },
  contactListContainerWithPaddingBottom: {
    paddingBottom: 100, /* FIXME: padding bottom not working */
    paddingHorizontal: 16,
  },
})
