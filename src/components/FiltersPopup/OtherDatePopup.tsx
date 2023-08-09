import { Header1 } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import {
  FiltersPopupContainer,
  HeaderWrap,
} from './styles'
import BottomSheetPopup from '../UI/BottomSheet'
import { useFilters } from '../../context/FiltersContext'
import ListButton from '../UI/ListButton'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { formatDate } from '../../utils/timeUtils'
import { Platform } from 'react-native'


type Props = {
  visible: boolean;
  onClose: () => void;
}

const OtherDatePopup: React.FC<Props> = React.memo(({ visible, onClose }) => {
  const { otherPeriodStartDate, otherPeriodEndDate, setOtherPeriodStartDate, setOtherPeriodEndDate } = useFilters()
  const [showStartDate, setShowStartDate] = useState(false)
  const [showEndDate, setShowEndDate] = useState(false)

  const handleStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setOtherPeriodStartDate(date)
    }
    setShowStartDate(false)
  }
  const handleEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setOtherPeriodEndDate(date)
    }
    setShowEndDate(false)
  }

  return (
    <BottomSheetPopup
      visible={visible}
      onClose={onClose}
      snapPoints={['30%']}
    >
      <FiltersPopupContainer>
        <HeaderWrap>
          <Header1>Other period</Header1>
          <IconBtn icon="cancel" type="light" onPress={onClose} />
        </HeaderWrap>
        <ListButton
          title="From:"
          showBadge
          badgeText={otherPeriodStartDate && formatDate(otherPeriodStartDate)}
          onPress={() => setShowStartDate(true)} />
        <ListButton
          title="To:"
          showBadge
          badgeText={otherPeriodEndDate && formatDate(otherPeriodEndDate)}
          onPress={() => setShowEndDate(true)} />
        {showStartDate && (
          <DateTimePicker
            value={otherPeriodStartDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'compact' : 'default'}
            onChange={handleStartDateChange}
          />
        )}
        {showEndDate && (
          <DateTimePicker
            value={otherPeriodEndDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'compact' : 'default'}
            onChange={handleEndDateChange}
          />
        )}
      </FiltersPopupContainer>
    </BottomSheetPopup>
  )
})

export default OtherDatePopup
