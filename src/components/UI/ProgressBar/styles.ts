import styled from 'styled-components/native'
import COLORS from '../../../styles/colors'


export const ProgressBarContainer = styled.View<{ align: string }>`
  width: 100%;
  height: 8px;
  background: ${COLORS.bgGrey};
  border-radius: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ align }) => align};
`

export const ProgressBarFill = styled.View<{ percent: number, type: string }>`
  width: ${({ percent }) => percent}%;
  height: 8px;
  background: ${({ type }) => type === 'primary' ? COLORS.primary : COLORS.red};
  border-radius: 40px;
`
