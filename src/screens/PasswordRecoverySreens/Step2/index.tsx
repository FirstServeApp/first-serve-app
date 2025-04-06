import ButtonComponent from '../../../components/UI/Button'
import { Header2, TextS } from '../../../styles/typography'
import { styles } from '../../../components/UI/Container'
import { LinkWrap, Subtitle } from '../styles'
import Link from '../../../components/UI/Link'
import { useNavigation } from '@react-navigation/native'
import {
  UnauthenticatedNavigationProps,
  UnauthenticatedStackParams,
} from '../../../navigation/UnauthenticatedNavigation'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OTPFormData, otpSchema } from '../../../validations/authValidations'
import OneFieldForm from '../../../components/OneFieldForm'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { formatTime } from '../../../utils/timeUtils'
import COLORS from '../../../styles/colors'
import AuthService from '../../../services/AuthService'
import { useTimer } from 'react-timer-hook'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { getButtonsBlockStyles, keyboardDidHideListener, keyboardDidShowListener } from '../../../utils/keyboardUtils'


type Props = NativeStackScreenProps<UnauthenticatedStackParams, 'PasswordRecoveryStep2'>

const OTPCodeScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState(false)
  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + (60 * 2))
  const { totalSeconds, restart, isRunning } = useTimer({ expiryTimestamp })
  const methods = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
    mode: 'onBlur',
  })
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0)
  const { bottom } = useSafeAreaInsets()
  const { buttonsBlock, onKeyboardOpen } = getButtonsBlockStyles(bottom, keyboardOffset)

  const onSubmit: SubmitHandler<OTPFormData> = async data => {
    setLoading(true)

    await AuthService
      .verifyOTP(route.params.id, data.otp)
      .then(() => navigation.navigate('PasswordRecoveryStep3', { id: route.params.id }))
      .catch(err => {
        if (err instanceof Error) {
          methods.setError('otp', { message: err.message, type: 'onBlur' })
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isRunning) {
      const newExpiryTimestamp = new Date()
      newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + (60 * 2))
      restart(newExpiryTimestamp)
    }

    const show = keyboardDidShowListener(setKeyboardOffset)
    const hide = keyboardDidHideListener(setKeyboardOffset)
    return () => {
      show.remove()
      hide.remove()
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <Header2>Enter code</Header2>
        <Subtitle>
          <TextS>
            A confirmation code was sent to {route.params.email}.
            Don&#x2019;t forget to check your spam folder
          </TextS>
        </Subtitle>
        <FormProvider {...methods}>
          <OneFieldForm
            name="otp"
            placeholder="Code"
            autoCapitalize="none"
            keyboardType="number-pad"
            editable={!isLoading}
            maxLength={4}
            autoFocus
          />
        </FormProvider>
        <View style={[buttonsBlock, !!keyboardOffset && onKeyboardOpen]}>
          <ButtonComponent
            title="Complete"
            loading={isLoading}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
          />
          <LinkWrap>
            {totalSeconds > 0 ? (
              <TextS color={COLORS.darkGrey}>Send code again in {formatTime(totalSeconds)}</TextS>
            ) : (
              <Link onPress={() => navigation.navigate('PasswordRecoveryStep1')}>Send code again</Link>
            )}
          </LinkWrap>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default OTPCodeScreen
