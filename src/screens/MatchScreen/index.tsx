import { useCallback, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MatchPopup from '../../components/MatchPopup'
import ButtonsBlock from './ButtonsBlock'
import MatchCard from './MatchCard'
import { Container, CardBlockContainer, styles, TopBlockWrap, ButtonContainer } from './styles'
import MatchHeader from '../../components/MatchHeader'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useMatch } from '../../context/MatchContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
// import { StoreKeys, getItemFromStore, setItemInStore } from '../../utils/secureStoreUtils'
import Loader from '../../components/UI/Loader'
import { View } from 'react-native'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'Match'>

const MatchScreen: React.FC<Props> = ({ route }) => {
  const { continueMatchV2, setPausedMatchId, pausedMatchId } = useMatch()
  const { bottom } = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<AuthenticatedNavigationProps>()

  // useFocusEffect(useCallback(() => {
  //   const loadMatches = async () => {
  //     setLoading(true)
  //     // if (route.params?.pausedMatchId !== undefined || pausedMatchId) {
  //     //   setPausedMatchId(route.params?.pausedMatchId || pausedMatchId)
  //     //   await continueMatchV2((route.params?.pausedMatchId || pausedMatchId)!)
  //     //     .catch(err => {
  //     //       console.log(err)
  //     //       navigation.navigate('Home')
  //     //     })
  //     // }
  //     if (pausedMatchId) {
  //       setPausedMatchId(pausedMatchId)
  //       await continueMatchV2(pausedMatchId)
  //         .catch(err => {
  //           console.log(err)
  //           navigation.navigate('Home')
  //         })
  //     }
  //     setLoading(false)
  //   }
  //   loadMatches()
  //   // if (isMatchPaused) {
  //   //   continueMatch()
  //   // }
  // }, []))

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true)
      // if (route.params?.pausedMatchId !== undefined || pausedMatchId) {
      //   setPausedMatchId(route.params?.pausedMatchId || pausedMatchId)
      //   await continueMatchV2((route.params?.pausedMatchId || pausedMatchId)!)
      //     .catch(err => {
      //       console.log(err)
      //       navigation.navigate('Home')
      //     })
      // }
      if (pausedMatchId) {
        setPausedMatchId(pausedMatchId)
        await continueMatchV2(pausedMatchId)
          .catch(err => {
            console.log(err)
            navigation.navigate('Home')
          })
      }
      setLoading(false)
    }
    loadMatches()
  }, [])

  if (route.params?.pausedMatchId !== undefined && loading) {
    return <Loader />
  }

  return (
    <Container>
      {/* <GestureHandlerRootView style={styles.container}> */}
      <View style={styles.container}>
        <TopBlockWrap>
          <MatchHeader />
          <CardBlockContainer>
            <MatchCard />
          </CardBlockContainer>
        </TopBlockWrap>
        <ButtonContainer bottomInset={bottom}>
          <ButtonsBlock />
        </ButtonContainer>
        <MatchPopup />
      </View>
      {/* </GestureHandlerRootView> */}
    </Container>
  )
}

export default MatchScreen
