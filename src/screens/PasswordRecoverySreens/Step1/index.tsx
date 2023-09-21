import ButtonComponent from '../../../components/UI/Button'
import { Header2, TextS } from '../../../styles/typography'
import { styles, ButtonsBlock } from '../../../components/UI/Container'
import { LinkWrap, Subtitle } from '../styles'
import Link from '../../../components/UI/Link'
import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedNavigationProps } from '../../../navigation/UnauthenticatedNavigation'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EmailFormData, emailSchema } from '../../../validations/authValidations'
import OneFieldForm from '../../../components/OneFieldForm'
import AuthService from '../../../services/AuthService'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'


const PasswordRecoveryScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<EmailFormData> = async data => {
    setLoading(true)
    await AuthService
      .sendOTP(data.email)
      .then(res => navigation.navigate('PasswordRecoveryStep2', { email: data.email, id: res.data.id }))
      .catch(err => {
        if (err === '404' || err === '400') {
          methods.setError('email', { message: 'Invalid email address', type: 'onBlur' })
          return setLoading(false)
        }
      })
      .finally(() => setLoading(false))
  }

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
        <ButtonsBlock>
          <ButtonComponent
            title="Next"
            loading={isLoading}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
          />
          <LinkWrap>
            <Link onPress={() => navigation.navigate('Login')}>I remembered password</Link>
          </LinkWrap>
        </ButtonsBlock>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PasswordRecoveryScreen
