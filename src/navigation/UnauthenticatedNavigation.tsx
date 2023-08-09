import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import PasswordRecoveryScreen from '../screens/PasswordRecoverySreens/Step1'
import OTPCodeScreen from '../screens/PasswordRecoverySreens/Step2'
import IconBtn from '../components/UI/Button/IconBtn'
import { useNavigation } from '@react-navigation/native'
import ChangePasswordScreen from '../screens/PasswordRecoverySreens/Step3'
import PasswordRecoveryFinalScreen from '../screens/PasswordRecoverySreens/Step4'
import OnboardingScreen from '../screens/OnboardingScreen'
import { StackAnimationTypes } from 'react-native-screens'
import { useAuth } from '../context/AuthContext'


export type UnauthenticatedStackParams = {
  Onboarding: undefined;
  Register: { animation?: StackAnimationTypes } | undefined;
  Login: undefined;
  PasswordRecoveryStep1: undefined;
  PasswordRecoveryStep2: { email: string, id: string };
  PasswordRecoveryStep3: { id: string };
  PasswordRecoveryStep4: undefined;
}

export type UnauthenticatedNavigationProps = NativeStackNavigationProp<UnauthenticatedStackParams>

const UnauthenticatedStack = createNativeStackNavigator<UnauthenticatedStackParams>()

const UnauthenticatedNavigation = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const { isFirstLaunch } = useAuth()

  return (
    <UnauthenticatedStack.Navigator
      initialRouteName={isFirstLaunch ? 'Onboarding' : 'Login'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
        headerBackVisible: false,
        headerLeft: () => <IconBtn icon="arrow-left" onPress={() => navigation.goBack()} type="light" />,
        headerShadowVisible: false,
      }}
    >
      <UnauthenticatedStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
      <UnauthenticatedStack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ route }) => ({
          animation: route.params?.animation ? route.params.animation : 'slide_from_left',
        })}
      />
      <UnauthenticatedStack.Screen
        name="Login"
        component={LoginScreen}
      />
      <UnauthenticatedStack.Screen
        options={{ animation: 'fade' }}
        name="PasswordRecoveryStep1"
        component={PasswordRecoveryScreen}
      />
      <UnauthenticatedStack.Screen
        name="PasswordRecoveryStep2"
        component={OTPCodeScreen}
        options={{
          animation: 'fade',
          headerShown: true,
          headerTitle: '',
        }}
      />
      <UnauthenticatedStack.Screen
        options={{ animation: 'fade' }}
        name="PasswordRecoveryStep3"
        component={ChangePasswordScreen}
      />
      <UnauthenticatedStack.Screen
        options={{ animation: 'fade' }}
        name="PasswordRecoveryStep4"
        component={PasswordRecoveryFinalScreen}
      />
    </UnauthenticatedStack.Navigator>
  )
}

export default UnauthenticatedNavigation
