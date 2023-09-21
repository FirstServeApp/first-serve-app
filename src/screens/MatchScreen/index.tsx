import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MatchPopup from '../../components/MatchPopup'
import ButtonsBlock from './ButtonsBlock'
import MatchCard from './MatchCard'
import { Container, CardBlockContainer, styles, TopBlockWrap, ButtonContainer } from './styles'
import MatchHeader from '../../components/MatchHeader'
import { useFocusEffect } from '@react-navigation/native'
import { useMatch } from '../../context/MatchContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const MatchScreen: React.FC = () => {
  const { isMatchPaused, continueMatch } = useMatch()
  const { bottom } = useSafeAreaInsets()

  useFocusEffect(useCallback(() => {
    if (isMatchPaused) {
      continueMatch()
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
        <ButtonContainer bottomInset={bottom}>
          <ButtonsBlock />
        </ButtonContainer>
        <MatchPopup />
      </GestureHandlerRootView>
    </Container>
  )
}

export default MatchScreen
