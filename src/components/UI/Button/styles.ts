import styled from 'styled-components/native'
import COLORS from '../../../styles/colors'
import { BtnProps } from './index'


const { primary, lightGray, black, grey, darkPrimary } = COLORS

const getButtonBackground = (type?: string, disabled?: boolean) => {
  if (type === 'primary') {
    return disabled ? COLORS.primaryDisabled : primary
  } else if (type === 'opponent') {
    return COLORS.red
  } else {
    return disabled ? COLORS.lightGrayDisabled : lightGray
  }
}

const getIconBtnBg = (type: string) => {
  switch (type) {
    case 'light':
      return 'white'
    case 'dark':
      return lightGray
    case 'black':
      return black
    default:
      return lightGray
  }
}

export const ButtonContainer = styled.TouchableOpacity<BtnProps>`
  width: 100%;
  padding: ${({ icon }) => icon ? '12px' : '14px'};
  background: ${({ type, disabled }) => getButtonBackground(type, disabled)};
  padding: ${({ size }) => size === 'S' ? '14px' : '20px'};
  border: none;
  border-radius: ${({ size }) => size === 'S' ? '22px' : '28px'};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

export const ButtonText = styled.Text<{ type?: string }>`
  font-family: 'sf-600';
  font-style: normal;
  font-size: 15px;
  line-height: 20px;
  align-items: center;
  color: ${black};
`

export const IconContainer = styled.View`
  margin-right: 4px;
`

export const CheckboxContainer = styled.TouchableOpacity<{ isChecked: boolean }>`
    width: 24px;
    height: 24px;
    border: ${({ isChecked }) => isChecked ? `2px solid ${darkPrimary}` : `2px solid ${grey}`};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${({ isChecked }) => isChecked ? darkPrimary : 'white'};
`

export const RadioBtnContainer = styled.TouchableOpacity<{ isChecked: boolean }>`
    width: 24px;
    height: 24px;
    border: ${({ isChecked }) => isChecked ? `2px solid ${darkPrimary}` : `2px solid ${grey}`};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: white;
`

export const SocialBtnContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 8px;
`

export const IconBtnContainer = styled.TouchableOpacity<{ type: string }>`
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 8px;
  border-radius: 18px;
  background: ${({ type }) => getIconBtnBg(type)};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`

export const NavigationLinkContainer = styled.TouchableOpacity`
  height: 24px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
