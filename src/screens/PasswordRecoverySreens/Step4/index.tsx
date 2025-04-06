import ButtonComponent from '../../../components/UI/Button'
import { styles } from '../../../components/UI/Container'
import { FinalImageContainer } from '../styles'
import { useNavigation } from '@react-navigation/native'
import { UnauthenticatedNavigationProps } from '../../../navigation/UnauthenticatedNavigation'
import { Header2 } from '../../../styles/typography'
import { Illustration } from '../../../components/UI/Illustration'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'
import { useEffect, useState } from 'react'
import { getButtonsBlockStyles, keyboardDidHideListener, keyboardDidShowListener } from '../../../utils/keyboardUtils'


const PasswordRecoveryFinalScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const { bottom } = useSafeAreaInsets()
  const { buttonsBlock, onKeyboardOpen } = getButtonsBlockStyles(bottom, keyboardOffset)

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
        <FinalImageContainer>
          <Illustration name="password-restored" />
          <Header2>Password restored!</Header2>
        </FinalImageContainer>
        <View style={[buttonsBlock, !!keyboardOffset && onKeyboardOpen]}>
          <ButtonComponent
            title="Done"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PasswordRecoveryFinalScreen
