import ButtonComponent from '../../components/UI/Button'
import { Header2, TextS } from '../../styles/typography'
import { styles } from '../../components/UI/Container'
import { Subtitle, LinkWrap } from './styles'
import Link from '../../components/UI/Link'
import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedNavigationProps } from '../../navigation/UnauthenticatedNavigation'
import LoginForm from '../../components/LoginForm'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormData, loginSchema } from '../../validations/authValidations'
import SocialSigninBtns from '../../components/UI/SocialBtnsBlock'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { getButtonsBlockStyles, keyboardDidHideListener, keyboardDidShowListener } from '../../utils/keyboardUtils'


const LoginScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0)
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  })
  const { login } = useAuth()
  const { bottom } = useSafeAreaInsets()
  const { buttonsBlock, onKeyboardOpen } = getButtonsBlockStyles(bottom, keyboardOffset)

  const onLogin: SubmitHandler<LoginFormData> = async data => {
    setLoading(true)
    await login(data.email, data.password)
      .catch(err => {
        if (err instanceof Error) {
          methods.setError('email', { message: err.message, type: 'onBlur' })
          return setLoading(false)
        }
      })
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
        <StatusBar style="dark" />
        <Header2>Log in</Header2>
        <Subtitle>
          <TextS>Don't have an account yet?&nbsp;</TextS>
          <Link onPress={() => navigation.navigate('Register')}>Create account</Link>
        </Subtitle>
        <FormProvider {...methods}>
          <LoginForm loading={isLoading} />
        </FormProvider>
        <SocialSigninBtns />
        <View style={[buttonsBlock, !!keyboardOffset && onKeyboardOpen]}>
          <ButtonComponent
            title="Login"
            loading={isLoading}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onLogin)}
          />
          <LinkWrap>
            <Link onPress={() => navigation.navigate('PasswordRecoveryStep1')}>Forgot password</Link>
          </LinkWrap>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen
