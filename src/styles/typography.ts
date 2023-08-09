import styled, { css } from 'styled-components/native'
import COLORS from './colors'


const { black, darkGrey } = COLORS

const getTextColor = (additional?: boolean, color?: string) => {
  if (color) {
    return color
  } else if (additional) {
    return darkGrey
  } else {
    return black
  }
}

const text = css`
  font-style: normal;
  align-items: center;
  color: ${black};
`

export const Header1 = styled.Text<{ medium?: boolean; }>`
  ${text};
  font-family: ${({ medium }) => medium ? 'sf-500' : 'sf-600'};
  font-size: 32px;
  line-height: 32px;
`

export const Header2 = styled.Text`
  ${text};
  font-family: 'sf-600';
  font-size: 28px;
  line-height: 28px;
`

export const Header3 = styled.Text`
  ${text};
  font-family: 'sf-500';
  font-size: 24px;
  line-height: 28px;
`

export const TextL = styled.Text<{ additional?: boolean, color?: string }>`
  ${text};
  font-family: 'sf-500';
  font-size: 18px;
  line-height: ${({ additional }) => additional ? '20px' : '24px'};
  color: ${({ additional, color }) => getTextColor(additional, color)};
`

export const TextS = styled.Text<{ additional?: boolean, color?: string }>`
  ${text};
  font-family: 'sf-500';
  font-size: 15px;
  line-height: ${({ additional }) => additional ? '16px' : '20px'};
  color: ${({ additional, color }) => getTextColor(additional, color)};
`

export const Caption = styled.Text`
  ${text};
  font-family: 'sf-700';
  font-size: 12px;
  line-height: 10px;
`
