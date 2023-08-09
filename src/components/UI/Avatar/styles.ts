import styled from 'styled-components/native'


export const AvatarImage = styled.ImageBackground<{ type: 'S' | 'L' }>`
  width: ${({ type }) => type === 'S' ? '48px' : '120px'};
  height: ${({ type }) => type === 'S' ? '48px' : '120px'};
  border-radius: ${({ type }) => type === 'S' ? '22px' : '48px'};
  overflow: hidden;
  justify-content: center;
  align-items: center;
`

export const AvatarLargeContainer = styled.View`
  width: 120px;
  height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const IconContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`
