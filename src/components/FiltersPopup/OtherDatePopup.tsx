import { TextL } from '../../styles/typography'
import { SelectDateContainer, OtherDateBtnsContainer } from './styles'
import { DateFilterNames, useFilters } from '../../context/FiltersContext'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import { PopupBtn } from '../MatchPopup/styles'
import ButtonComponent from '../UI/Button'


type Props = {
  visible: boolean;
  onClose(): void;
}

const OtherPeriodPopup: React.FC<Props> = React.memo(({ visible, onClose }) => {
  const { setDateFilter,
    otherPeriodStartDate, otherPeriodEndDate, setOtherPeriodStartDate, setOtherPeriodEndDate } = useFilters()
  const [showDatePickers, setShowDatePickers] = useState(true)

  const handleStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') {
      setOtherPeriodStartDate(date)
    }
  }
  const handleEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') {
      setOtherPeriodEndDate(date)
    }
  }

  const save = () => {
    setShowDatePickers(false)
    setDateFilter(DateFilterNames.Other)
    return onClose()
  }

  const cancel = () => {
    setShowDatePickers(false)
    setDateFilter(DateFilterNames.All)
    return onClose()
  }

  useEffect(() => {
    if (visible) {
      setShowDatePickers(true)
    }
  }, [visible])

  return (
    <>
      <SelectDateContainer>
        <TextL>From:</TextL>
        {showDatePickers && <DateTimePicker
          testID="fromDatePicker"
          value={otherPeriodStartDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />}
      </SelectDateContainer>
      <SelectDateContainer>
        <TextL>To:</TextL>
        {showDatePickers && <DateTimePicker
          testID="toDatePicker"
          value={otherPeriodEndDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />}
      </SelectDateContainer>
      <OtherDateBtnsContainer>
        <PopupBtn>
          <ButtonComponent title="Cancel" type="secondary" onPress={cancel} />
        </PopupBtn>
        <PopupBtn>
          <ButtonComponent title="Save" onPress={save} />
        </PopupBtn>
      </OtherDateBtnsContainer>
    </>
  )
})

export default OtherPeriodPopup
