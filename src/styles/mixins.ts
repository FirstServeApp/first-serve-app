import { css } from 'styled-components/native'
import COLORS from './colors'


const { black } = COLORS


const text = css`
  font-style: normal;
  align-items: center;
  color: ${black};
`

export const h1 = css<{ medium?: boolean; }>`
  ${text};
  font-family: ${({ medium }) => medium ? 'sf-500' : 'sf-600'};
  font-size: 32px;
  line-height: 32px;
`

export const h2 = css`
  ${text};
  font-family: 'sf-600';
  font-size: 28px;
  line-height: 28px;
`

export const h3 = css`
  ${text};
  font-family: 'sf-500';
  font-size: 24px;
  line-height: 28px;
`

export const textLarge= css<{ additional?: boolean }>`
  ${text};
  font-family: 'sf-500';
  font-size: 18px;
  line-height: ${({ additional }) => additional ? '20px' : '24px'};
`

export const textSmall = css<{ additional?: boolean }>`
  ${text};
  font-family: 'sf-500';
  font-size: 15px;
  line-height: ${({ additional }) => additional ? '16px' : '20px'};
`

export const captionText = css`
  ${text};
  font-family: 'sf-700';
  font-size: 12px;
  line-height: 10px;
`
