import React, { useState } from 'react'
import COLORS from '../../../styles/colors'
import { InputContainer, InputField, ErrorContainer } from './styles'
import { Icon } from '../Icon'
import { TouchableOpacity, TextInputProps } from 'react-native'
import { TextS } from '../../../styles/typography'

interface InputProps extends TextInputProps {
  placeholder?: string;
  secure?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, secure, error, ...rest }) => {
  const [value, setValue] = useState<string>()
  const [isSecureText, setSecureText] = useState<boolean>(!!secure)

  const toggleSecureText = () => setSecureText(prevState => !prevState)

  return (
    <>
      <InputContainer error={error}>
        <InputField
          placeholder={placeholder}
          placeholderTextColor={COLORS.darkGrey}
          cursorColor={COLORS.black}
          onChangeText={setValue}
          value={value}
          secureTextEntry={isSecureText}
          maxLength={secure ? 16 : 36}
          textAlignVertical="center"
          {...rest}
        />
        {secure && (
          <TouchableOpacity onPress={toggleSecureText}>
            <Icon name={isSecureText ? 'eye-open' : 'eye-close'} />
          </TouchableOpacity>
        )}
      </InputContainer>
      {error && (
        <ErrorContainer>
          <TextS color={COLORS.red}>{error}</TextS>
        </ErrorContainer>
      )}
    </>
  )
}

export default Input
