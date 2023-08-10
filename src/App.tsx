import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './navigation'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './context/AuthContext'
import { MatchProvider } from './context/MatchContext'
import { FiltersProvider } from './context/FiltersContext'
import ToastMessage from './components/UI/ToastMessage'
import { SafeAreaProvider } from 'react-native-safe-area-context'


export default function App() {
  try {
    const [fontsLoaded] = useFonts({
      'sf-700': require('./assets/font/SF-Pro-Display-Bold.otf'),
      'sf-600': require('./assets/font/SF-Pro-Display-Semibold.otf'),
      'sf-500': require('./assets/font/SF-Pro-Display-Medium.otf'),
    })

    if (!fontsLoaded) {
      return null
    }

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AuthProvider>
            <MatchProvider>
              <FiltersProvider>
                <RootNavigation />
              </FiltersProvider>
            </MatchProvider>
          </AuthProvider>
          <ToastMessage />
        </NavigationContainer>
      </SafeAreaProvider>
    )
  } catch (err) {
    throw err
  }
}
