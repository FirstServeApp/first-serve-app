import FilterRadioBtn from './FilterRadioBtn'
import { DateFilterNames } from '../../context/FiltersContext'
import ListButton from '../UI/ListButton'


type Props = {
  onOpen(): void;
}

const DateFilterPopup: React.FC<Props> = ({ onOpen }) => (
  <>
    <FilterRadioBtn name={DateFilterNames.All} />
    <FilterRadioBtn name={DateFilterNames.Day} />
    <FilterRadioBtn name={DateFilterNames.Week} />
    <FilterRadioBtn name={DateFilterNames.Month} />
    <ListButton
      title={DateFilterNames.Other}
      onPress={onOpen}
      showRightChevron
    />
  </>
)

export default DateFilterPopup
