import styled from 'styled-components/native'
import COLORS from '../../styles/colors'


export const MatchHeaderContainer = styled.View<{ topInset: number }>`
  width: 100%;
  padding: 12px 16px;
  padding-top: ${({ topInset }) => `${topInset}px`};
  background: ${COLORS.lightGray};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
