import { TextS } from '../../styles/typography'
import { MatchHeaderContainer } from './styles'
import IconBtn from '../../components/UI/Button/IconBtn'
import { useMatch } from '../../context/MatchContext'
import { View } from 'react-native'


const MatchHeader: React.FC = () => {
  const { setShowMatchPopup, undo, matchHistory } = useMatch()

  return (
    <MatchHeaderContainer>
      <IconBtn icon="arrow-left" onPress={() => undo()} disabled={matchHistory.length <= 0} />
      <TextS>Match tracking</TextS>
      <IconBtn icon="more" onPress={() => setShowMatchPopup(true)} />
    </MatchHeaderContainer>
  )
}

export default MatchHeader
