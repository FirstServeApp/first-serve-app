/* eslint-disable react-native/no-inline-styles */
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
import { useCallback, useEffect, useState } from 'react'
import Bluebird from 'bluebird'
import * as SplashScreen from 'expo-splash-screen'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import { watchEvents } from 'react-native-watch-connectivity'
// import matchService, { CreateMatchSet } from './services/matchService'
// import { Buffer } from 'buffer'


SplashScreen.preventAutoHideAsync()

// type WatchMatchData = {
//   winner: string;
//   opponentName: string;
//   sets: [CreateMatchSet];
//   duration: number;
//   matchUniqueId: any;
// }

// const matchUniqueIds: any = []

export default function App() {
  try {
    const [fontsLoaded] = useFonts({
      'sf-700': require('./assets/font/SF-Pro-Display-Bold.otf'),
      'sf-600': require('./assets/font/SF-Pro-Display-Semibold.otf'),
      'sf-500': require('./assets/font/SF-Pro-Display-Medium.otf'),
    })
    const [appIsReady, setAppIsReady] = useState(false)
    // const { triggerMatchListRefresh } = useFilters()

    // const watchListener = watchEvents.on('message', async payload => {
    //   const message = Buffer.from(String(payload.watchMessage), 'base64').toString('utf-8')
    //   const data = JSON.parse(message)

    //   await matchService
    //     .create(data.winner === 'opponent', data.opponentName, data.sets, data.duration)
    // })
    // const watchListener = watchEvents.addListener('user-info', async payload => {
    //   const message = Buffer.from(String(payload[0].watchMessage), 'base64').toString()
    //   const data = JSON.parse(message) as WatchMatchData

    //   if (matchUniqueIds.includes(data.matchUniqueId)) {
    //     return
    //   }

    //   matchUniqueIds.push(data.matchUniqueId)

    //   await matchService
    //     .create(data.winner === 'opponent', data.opponentName, data.sets, data.duration)
    //     .then(() => triggerMatchListRefresh())
    // })

    useEffect(() => {
      // watchListener()
      Bluebird.delay(1000)
        .then(() => setAppIsReady(true))
    }, [])

    const onLayoutRootView = useCallback(async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync()
      }
    }, [appIsReady])

    if (!fontsLoaded || ! appIsReady) {
      return null
    }

    return (
      <ErrorBoundaryComponent>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <AuthProvider>
                  <FiltersProvider>
                    <PopupProvider>
                      <MatchProvider>
                        <RootNavigation setAppIsReady={setAppIsReady} />
                      </MatchProvider>
                    </PopupProvider>
                  </FiltersProvider>
                </AuthProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
            <ToastMessage />
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundaryComponent>
    )
  } catch (err) {
    throw err
  }
}
