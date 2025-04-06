import { Keyboard, StyleSheet } from 'react-native'


export const keyboardDidShowListener = (setKeyboardOffset: React.Dispatch<React.SetStateAction<number>>) => {
  return Keyboard.addListener('keyboardWillShow', event => {
    if (event.startCoordinates?.height) {
      setKeyboardOffset(event.endCoordinates.height)
    }
  })
}

export const keyboardDidHideListener = (setKeyboardOffset: React.Dispatch<React.SetStateAction<number>>) => {
  return Keyboard.addListener('keyboardWillHide', () => {
    setKeyboardOffset(0)
  })
}

export const getButtonsBlockStyles = (bottom: number, keyboardOffset: number) => {
  return StyleSheet.create({
    buttonsBlock: {
      right: 16,
      left: 16,
      position: 'absolute',
      gap: 12,
      bottom: bottom,
    },
    onKeyboardOpen: {
      bottom: keyboardOffset + 16,
    },
  })
}
