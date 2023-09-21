import { Header1 } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import FilterRadioBtn from './FilterRadioBtn'
import {
  FiltersPopupContainer,
  HeaderWrap,
} from './styles'
import BottomSheetPopup2 from '../UI/BottomSheet'
import { DateFilterNames } from '../../context/FiltersContext'
import ListButton from '../UI/ListButton'


type Props = {
  visible: boolean;
  onClose(): void;
  onOpen(): void;
}

const DateFilterPopup: React.FC<Props> = ({ visible, onClose, onOpen }) => (
  <BottomSheetPopup2
    visible={visible}
    onClose={onClose}
    snapPoints={['50%']}
  >
    <FiltersPopupContainer>
      <HeaderWrap>
        <Header1>Filter by date</Header1>
        <IconBtn icon="cancel" type="light" onPress={onClose} />
      </HeaderWrap>
      <FilterRadioBtn name={DateFilterNames.All} />
      <FilterRadioBtn name={DateFilterNames.Day} />
      <FilterRadioBtn name={DateFilterNames.Week} />
      <FilterRadioBtn name={DateFilterNames.Month} />
      <ListButton
        title={DateFilterNames.Other}
        onPress={onOpen}
        showRightChevron
      />
    </FiltersPopupContainer>
  </BottomSheetPopup2>
)

export default DateFilterPopup
