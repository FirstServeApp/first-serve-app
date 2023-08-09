/* eslint-disable react-native/no-inline-styles */
import ButtonComponent from '../../../components/UI/Button'
import { Header2 } from '../../../styles/typography'
import { Container } from '../../../components/UI/Container'
import { ButtonsBlock } from '../styles'
import { useNavigation } from '@react-navigation/native'
import {
  UnauthenticatedNavigationProps,
  UnauthenticatedStackParams,
} from '../../../navigation/UnauthenticatedNavigation'
import { FormProvider, useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ConfirmPasswordFormData, confirmPasswordSchema } from '../../../validations/authValidations'
import AuthService from '../../../services/AuthService'
import { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Input from '../../../components/UI/Input'


type Props = NativeStackScreenProps<UnauthenticatedStackParams, 'PasswordRecoveryStep3'>

const ChangePasswordScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<ConfirmPasswordFormData>({
    resolver: yupResolver(confirmPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<ConfirmPasswordFormData> = async data => {
    setLoading(true)

    await AuthService
      .changePassword(route.params.id, data.password)
      .catch(err => {
        if (err === '400') {
          methods.setError('password', { message: 'Invalid password', type: 'onBlur' })
          return setLoading(false)
        }
      })
      .then(() => navigation.navigate('PasswordRecoveryStep4'))
      .finally(() => setLoading(false))
  }

  return (
    <Container>
      <Header2 style={{ marginBottom: 24 }}>Enter a new password</Header2>
      <FormProvider {...methods}>
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              autoCapitalize="none"
              autoComplete="password"
              maxLength={16}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={methods.formState.errors.password?.message?.toString()}
              editable={!isLoading}
              secure
            />
          )}
          name="password"
        />
        <Controller
          control={methods.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirm password"
              autoCapitalize="none"
              autoComplete="password"
              maxLength={16}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!isLoading}
              error={methods.formState.errors.confirmPassword?.message?.toString()}
              secure
            />
          )}
          name="confirmPassword"
        />
      </FormProvider>
      <ButtonsBlock>
        <ButtonComponent
          title="Complete"
          loading={isLoading}
          disabled={!methods.formState.isDirty || !methods.formState.isValid}
          onPress={methods.handleSubmit(onSubmit)}
        />
      </ButtonsBlock>
    </Container>
  )
}

export default ChangePasswordScreen
