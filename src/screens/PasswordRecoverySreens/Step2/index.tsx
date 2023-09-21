import ButtonComponent from '../../../components/UI/Button'
import { Header2, TextS } from '../../../styles/typography'
import { styles, ButtonsBlock } from '../../../components/UI/Container'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'


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

  const onSubmit: SubmitHandler<OTPFormData> = async data => {
    setLoading(true)

    await AuthService
      .verifyOTP(route.params.id, data.otp)
      .then(() => navigation.navigate('PasswordRecoveryStep3', { id: route.params.id }))
      .catch(err => {
        console.log(err)
        if (err === '400') {
          methods.setError('otp', { message: 'Invalid OTP code', type: 'onBlur' })
          return setLoading(false)
        } else if (err === '404') {
          methods.setError('otp', { message: 'OTP code has expired', type: 'onBlur' })
          return setLoading(false)
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
        <ButtonsBlock>
          <ButtonComponent
            title="Complete"
            loading={isLoading}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
          />
          {totalSeconds > 0 ? (
            <TextS color={COLORS.darkGrey}>Send code again in {formatTime(totalSeconds)}</TextS>
          ) : (
            <LinkWrap>
              <Link onPress={() => navigation.navigate('PasswordRecoveryStep1')}>Send code again</Link>
            </LinkWrap>
          )}
        </ButtonsBlock>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default OTPCodeScreen
