import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './navigation'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './context/AuthContext'
import { MatchProvider } from './context/MatchContext'
import { FiltersProvider } from './context/FiltersContext'
import ToastMessage from './components/UI/ToastMessage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PopupProvider } from './context/PopupContext'
import ErrorBoundaryComponent from './components/ErrorBoundary'


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
      <ErrorBoundaryComponent>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AuthProvider>
              <FiltersProvider>
                <PopupProvider>
                  <MatchProvider>
                    <RootNavigation />
                  </MatchProvider>
                </PopupProvider>
              </FiltersProvider>
            </AuthProvider>
            <ToastMessage />
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundaryComponent>
    )
  } catch (err) {
    throw err
  }
}
