import React, { useState } from 'react'
import DateFilterPopup from './DateFilterPopup'
import DefaultPopup from './DefaultPopup'
import OtherDatePopup from './OtherDatePopup'
import BottomSheetPopup2 from '../UI/BottomSheet/BottomSheetPopup'
import { FiltersPopupContainer, HeaderWrap } from './styles'
import { Header1 } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


enum FilterPopupNames {
  default = 'DEFAULT',
  players = 'PLAYERS',
  date = 'DATE',
  other = 'OTHER'
}

type Props = {
  visible: boolean;
  onClose: () => void;
}

const FiltersPopup: React.FC<Props> = ({ visible, onClose }) => {
  const [currentPopup, setCurrentPopup] = useState(FilterPopupNames.default)
  const { bottom } = useSafeAreaInsets()

  const showPopup = (popup: FilterPopupNames): boolean => {
    return popup === currentPopup && visible
  }

  const getHeader = (): string => {
    switch (currentPopup) {
      case FilterPopupNames.date:
        return 'Filter by date'
      case FilterPopupNames.other:
        return 'Other period'
      default:
        return 'Filters'
    }
  }

  return (
    <BottomSheetPopup2
      visible={visible}
      onClose={() => {
        onClose()
        setCurrentPopup(FilterPopupNames.default)
      }}
    >
      <FiltersPopupContainer bottomInset={bottom}>
        <HeaderWrap>
          <Header1 medium>{getHeader()}</Header1>
          <IconBtn icon="cancel" type="flat" onPress={onClose} />
        </HeaderWrap>
        {showPopup(FilterPopupNames.default) && (
          <DefaultPopup
            visible={visible}
            onClose={onClose}
            onOpen={() => setCurrentPopup(FilterPopupNames.date)}
          />
        )}
        {showPopup(FilterPopupNames.date) && (
          <DateFilterPopup
            onOpen={() => setCurrentPopup(FilterPopupNames.other)}
          />
        )}
        {showPopup(FilterPopupNames.other) && (
          <OtherDatePopup visible={visible} onClose={onClose} />
        )}
      </FiltersPopupContainer>
    </BottomSheetPopup2>
  )
}

export default FiltersPopup
