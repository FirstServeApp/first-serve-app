import ButtonComponent from '../../../components/UI/Button'
import { Header2, TextS } from '../../../styles/typography'
import { styles } from '../../../components/UI/Container'
import { LinkWrap, Subtitle } from '../styles'
import Link from '../../../components/UI/Link'
import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedNavigationProps } from '../../../navigation/UnauthenticatedNavigation'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EmailFormData, emailSchema } from '../../../validations/authValidations'
import OneFieldForm from '../../../components/OneFieldForm'
import AuthService from '../../../services/AuthService'
import { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { keyboardDidShowListener, getButtonsBlockStyles, keyboardDidHideListener } from '../../../utils/keyboardUtils'


const PasswordRecoveryScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
    mode: 'onBlur',
  })
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0)
  const { bottom } = useSafeAreaInsets()
  const { buttonsBlock, onKeyboardOpen } = getButtonsBlockStyles(bottom, keyboardOffset)

  const onSubmit: SubmitHandler<EmailFormData> = async data => {
    setLoading(true)
    await AuthService
      .sendOTP(data.email)
      .then(res => navigation.navigate('PasswordRecoveryStep2', { email: data.email, id: res?.data.id }))
      .catch(err => {
        if (err instanceof Error) {
          methods.setError('email', { message: err.message, type: 'onBlur' })
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const show = keyboardDidShowListener(setKeyboardOffset)
    const hide = keyboardDidHideListener(setKeyboardOffset)
    return () => {
      show.remove()
      hide.remove()
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Header2>Password recovery</Header2>
        <Subtitle>
          <TextS>Enter the email to which your account was linked</TextS>
        </Subtitle>
        <FormProvider {...methods}>
          <OneFieldForm
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
            editable={!isLoading}
          />
        </FormProvider>
        <View style={[buttonsBlock, !!keyboardOffset && onKeyboardOpen]}>
          <ButtonComponent
            title="Next"
            loading={isLoading}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
          />
          <LinkWrap>
            <Link onPress={() => navigation.navigate('Login')}>I remembered password</Link>
          </LinkWrap>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PasswordRecoveryScreen
