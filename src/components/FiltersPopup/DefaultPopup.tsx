import ListButton from '../UI/ListButton'
import { useFilters } from '../../context/FiltersContext'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'


type Props = {
  visible: boolean;
  onClose(): void;
  onOpen(): void;
}

const DefaultPopup: React.FC<Props> = ({ onClose, onOpen }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { dateFilter, playersFilter } = useFilters()

  const getPlayersFilterTitle = () => {
    if (playersFilter.length === 0) {
      return 'All'
    } else {
      return `${playersFilter[0].slice(0, 10)}...`
    }
  }

  return (
    <>
      <ListButton
        title="Players"
        leftIcon="person"
        rightText={getPlayersFilterTitle()}
        onPress={() => {
          navigation.navigate('PlayersFilter')
          onClose()
        }}
      />
      <ListButton
        title="Date"
        leftIcon="calendar"
        rightText={dateFilter}
        onPress={onOpen}
      />
    </>
  )
}

export default DefaultPopup
