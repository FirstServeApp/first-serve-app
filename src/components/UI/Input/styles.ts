import styled from 'styled-components/native'
import COLORS from '../../../styles/colors'
import { textSmall } from '../../../styles/mixins'


const { lightGray, bgGrey, lightRed } = COLORS

export const InputContainer = styled.View<{ error?: string }>`
  width: 100%;
  background: ${({ error }) => error ? lightRed : lightGray};
  border-radius: 22px;
  padding: 0 16px;
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const InputField = styled.TextInput`
  ${textSmall}
  padding: 12px 0;
  flex: 1;
  text-align-vertical: center;
`

export const ErrorContainer = styled.View`
  width: 100%;
  padding: 4px 14px 0;
`

export const SearchBarContainer = styled.View`
  width: 100%;
  background: ${bgGrey};
  border-radius: 22px;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SearchBarField = styled.TextInput`
  ${textSmall}
  padding-left: 12px;
  flex: 1;
  text-align-vertical: center;
  align-items: center;
`
