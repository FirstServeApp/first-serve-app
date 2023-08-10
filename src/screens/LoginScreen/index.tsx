import ButtonComponent from '../../components/UI/Button'
import { Header2, TextS } from '../../styles/typography'
import { styles, ButtonsBlock } from '../../components/UI/Container'
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
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'


const LoginScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  })
  const { login } = useAuth()

  const onLogin: SubmitHandler<LoginFormData> = async data => {
    setLoading(true)
    await login(data.email, data.password)
      .then(err => {
        if (err === '500') {
          Toast.show({
            type: 'tomatoToast',
            text1: 'Something went wrong, please try again',
            visibilityTime: 2000,
          })

          methods.reset()
          return setLoading(false)
        } else if (err === '400') {
          methods.setError('password', { message: 'Invalid email or password', type: 'onBlur' })
          return setLoading(false)
        }
      })
  }

  return (
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
      <ButtonsBlock>
        <ButtonComponent
          title="Login"
          loading={isLoading}
          disabled={!methods.formState.isDirty || !methods.formState.isValid}
          onPress={methods.handleSubmit(onLogin)}
        />
        <LinkWrap>
          <Link onPress={() => navigation.navigate('PasswordRecoveryStep1')}>Forgot password</Link>
        </LinkWrap>
      </ButtonsBlock>
    </SafeAreaView>
  )
}

export default LoginScreen
