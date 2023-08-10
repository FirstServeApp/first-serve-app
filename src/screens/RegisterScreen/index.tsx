import ButtonComponent from '../../components/UI/Button'
import Checkbox from '../../components/UI/Button/Checkbox'
import { Header2, TextS } from '../../styles/typography'
import { styles, ButtonsBlock } from '../../components/UI/Container'
import { Subtitle, ConsentFormContainer, ConsentFormText } from './styles'
import Link from '../../components/UI/Link'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import SocialSigninBtns from '../../components/UI/SocialBtnsBlock'
import RegistrationForm from '../../components/RegistrationForm'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UnauthenticatedNavigationProps } from '../../navigation/UnauthenticatedNavigation'
import { RegistrationFormData, registrationSchema } from '../../validations/authValidations'
import { useAuth } from '../../context/AuthContext'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'


const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isConfirmed, setConfirmed] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onBlur',
  })
  const { signup } = useAuth()

  const onSignup: SubmitHandler<RegistrationFormData> = async data => {
    setLoading(true)

    await signup(data.email, data.password, data.name)
      .then(err => {
        if (err === '500') {
          Toast.show({
            type: 'tomatoToast',
            text1: 'Something went wrong, please try again',
            visibilityTime: 2000,
          })
        }
      })
      .finally(() => {
        setLoading(false)
        methods.reset()
        setConfirmed(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header2>Create account</Header2>
      <Subtitle>
        <TextS>Already have an account?&nbsp;</TextS>
        <Link onPress={() => navigation.navigate('Login')}>Sign in</Link>
      </Subtitle>
      <FormProvider {...methods}>
        <RegistrationForm loading={isLoading} />
      </FormProvider>
      <ConsentFormContainer>
        <ConsentFormText>
          <TextS>I accept the&nbsp;</TextS>
          <Link onPress={() => navigation.navigate('Login')}>privacy policy&nbsp;</Link>
          <TextS>and&nbsp;</TextS>
          <Link onPress={() => navigation.navigate('Login')}>terms of use</Link>
        </ConsentFormText>
        <Checkbox
          isChecked={isConfirmed}
          disabled={isLoading}
          onPress={() => setConfirmed(prevState => !prevState)}
        />
      </ConsentFormContainer>
      <SocialSigninBtns />
      <ButtonsBlock>
        <ButtonComponent
          title="Create account"
          loading={isLoading}
          disabled={!methods.formState.isDirty || !methods.formState.isValid || !isConfirmed}
          onPress={methods.handleSubmit(onSignup)}
        />
      </ButtonsBlock>
    </SafeAreaView>
  )
}

export default RegisterScreen
