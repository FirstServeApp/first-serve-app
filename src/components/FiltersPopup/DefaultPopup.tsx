import BottomSheetPopup from '../UI/BottomSheet'
import { FiltersPopupContainer, HeaderWrap } from './styles'
import { Header1 } from '../../styles/typography'
import ListButton from '../UI/ListButton'
import { useFilters } from '../../context/FiltersContext'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'


type Props = {
  visible: boolean;
  onClose: () => void;
  setShowDateFilter: (value: boolean) => void;
}

const DefaultPopup: React.FC<Props> = ({ visible, onClose, setShowDateFilter }) => {
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
    <BottomSheetPopup
      visible={visible}
      onClose={onClose}
      snapPoints={['30%']}
    >
      <FiltersPopupContainer>
        <HeaderWrap>
          <Header1>Filters</Header1>
        </HeaderWrap>
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
          onPress={() => {
            setShowDateFilter(true)
            onClose()
          }}
        />
      </FiltersPopupContainer>
    </BottomSheetPopup>
  )
}

export default DefaultPopup
