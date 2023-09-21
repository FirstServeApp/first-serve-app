import { Header1, TextL } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import {
  FiltersPopupContainer,
  HeaderWrap,
  SelectDateContainer,
} from './styles'
import BottomSheetPopup2 from '../UI/BottomSheet'
import { DateFilterNames, useFilters } from '../../context/FiltersContext'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React from 'react'
import { PopupBtn, PopupBtnsContainer } from '../MatchPopup/styles'
import ButtonComponent from '../UI/Button'


type Props = {
  visible: boolean;
  onClose(): void;
}

const OtherPeriodPopup: React.FC<Props> = React.memo(({ visible, onClose }) => {
  const { setDateFilter,
    otherPeriodStartDate, otherPeriodEndDate, setOtherPeriodStartDate, setOtherPeriodEndDate } = useFilters()

  const handleStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') {
      setOtherPeriodStartDate(date)
      setDateFilter(DateFilterNames.Other)
    }
  }
  const handleEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') {
      setOtherPeriodEndDate(date)
      setDateFilter(DateFilterNames.Other)
    }
  }

  return (
    <BottomSheetPopup2
      visible={visible}
      onClose={onClose}
      snapPoints={['35%']}
    >
      <FiltersPopupContainer>
        <HeaderWrap>
          <Header1>Other period</Header1>
          <IconBtn icon="cancel" type="light" onPress={onClose} />
        </HeaderWrap>
        <SelectDateContainer>
          <TextL>From:</TextL>
          <DateTimePicker
            testID="fromDatePicker"
            value={otherPeriodStartDate || new Date()}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        </SelectDateContainer>
        <SelectDateContainer>
          <TextL>To:</TextL>
          <DateTimePicker
            testID="toDatePicker"
            value={otherPeriodEndDate || new Date()}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        </SelectDateContainer>
        <PopupBtnsContainer>
          <PopupBtn>
            <ButtonComponent title="Cancel" type="secondary" onPress={onClose} />
          </PopupBtn>
          <PopupBtn>
            <ButtonComponent title="Save" onPress={onClose} />
          </PopupBtn>
        </PopupBtnsContainer>
      </FiltersPopupContainer>
    </BottomSheetPopup2>
  )
})

export default OtherPeriodPopup
