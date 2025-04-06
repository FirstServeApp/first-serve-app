import { TextS } from '../../styles/typography'
import { MatchHeaderContainer } from './styles'
import IconBtn from '../../components/UI/Button/IconBtn'
import { useMatch } from '../../context/MatchContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const MatchHeader: React.FC= () => {
  const { setShowMatchPopup, undo, matchChangesHistory } = useMatch()
  const { top } = useSafeAreaInsets()

  return (
    <MatchHeaderContainer topInset={top}>
      <IconBtn
        icon="arrow-left" type="flat"
        onPress={() => {
          if (matchChangesHistory.length === 0) {
            setShowMatchPopup(true)
          } else {
            undo()
          }
        }}
      />
      <TextS>Match tracking</TextS>
      <IconBtn icon="more" type="flat" onPress={() => setShowMatchPopup(true)} />
    </MatchHeaderContainer>
  )
}

export default MatchHeader
