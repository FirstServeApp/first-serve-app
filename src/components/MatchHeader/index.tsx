import { TextS } from '../../styles/typography'
import { MatchHeaderContainer } from './styles'
import IconBtn from '../../components/UI/Button/IconBtn'
import { useMatch } from '../../context/MatchContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const MatchHeader: React.FC = () => {
  const { setShowMatchPopup, undo, matchHistory } = useMatch()
  const { top } = useSafeAreaInsets()
  // matchHistory.length <= 0
  return (
    <MatchHeaderContainer topInset={top}>
      <IconBtn icon="arrow-left" onPress={() => undo()} disabled={false} />
      <TextS>Match tracking</TextS>
      <IconBtn icon="more" onPress={() => setShowMatchPopup(true)} />
    </MatchHeaderContainer>
  )
}

export default MatchHeader
