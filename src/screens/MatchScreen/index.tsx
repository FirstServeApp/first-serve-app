import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MatchPopup from '../../components/MatchPopup'
import ButtonsBlock from './ButtonsBlock'
import MatchCard from './MatchCard'
import { Container, CardBlockContainer, styles, TopBlockWrap } from './styles'
import MatchHeader from '../../components/MatchHeader'
import { useFocusEffect } from '@react-navigation/native'
import { useMatch } from '../../context/MatchContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'Match'>

const MatchScreen: React.FC<Props> = ({ navigation }) => {
  const { isMatchPaused, pauseMatch, continueMatch } = useMatch()

  useFocusEffect(useCallback(() => {
    if (isMatchPaused) {
      continueMatch()
    }

    const handleBlur = () => pauseMatch()

    navigation.addListener('blur', handleBlur)

    return () => {
      navigation.removeListener('blur', handleBlur)
    }
  }, []))

  return (
    <Container>
      <GestureHandlerRootView style={styles.container}>
        <TopBlockWrap>
          <MatchHeader />
          <CardBlockContainer>
            <MatchCard />
          </CardBlockContainer>
        </TopBlockWrap>
        <ButtonsBlock />
        <MatchPopup />
      </GestureHandlerRootView>
    </Container>
  )
}

export default MatchScreen
