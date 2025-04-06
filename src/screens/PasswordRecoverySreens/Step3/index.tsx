/* eslint-disable react-native/no-inline-styles */
import ButtonComponent from '../../../components/UI/Button'
import { Header2 } from '../../../styles/typography'
import { styles } from '../../../components/UI/Container'
import { useNavigation } from '@react-navigation/native'
import {
  UnauthenticatedNavigationProps,
  UnauthenticatedStackParams,
} from '../../../navigation/UnauthenticatedNavigation'
import { FormProvider, useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ConfirmPasswordFormData, confirmPasswordSchema } from '../../../validations/authValidations'
import AuthService from '../../../services/AuthService'
import { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Input from '../../../components/UI/Input'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'
import { getButtonsBlockStyles, keyboardDidHideListener, keyboardDidShowListener } from '../../../utils/keyboardUtils'


type Props = NativeStackScreenProps<UnauthenticatedStackParams, 'PasswordRecoveryStep3'>

const ChangePasswordScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<ConfirmPasswordFormData>({
    resolver: yupResolver(confirmPasswordSchema),
    mode: 'onBlur',
  })
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const { bottom } = useSafeAreaInsets()
  const { buttonsBlock, onKeyboardOpen } = getButtonsBlockStyles(bottom, keyboardOffset)

  const onSubmit: SubmitHandler<ConfirmPasswordFormData> = async data => {
    setLoading(true)

    await AuthService
      .changePassword(route.params.id, data.password)
      .catch(err => {
        if (err instanceof Error) {
          methods.setError('password', { message: err.message, type: 'onBlur' })
        }
      })
      .then(() => navigation.navigate('PasswordRecoveryStep4'))
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
        <View style={[buttonsBlock, !!keyboardOffset && onKeyboardOpen]}>
          <ButtonComponent
            title="Complete"
            loading={isLoading}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ChangePasswordScreen
