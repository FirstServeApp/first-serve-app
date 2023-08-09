import React from 'react'
import { DateFilterNames, useFilters } from '../../context/FiltersContext'
import ListCheckboxBtn from '../UI/ListButton/ListCheckboxBtn'


type Props = {
  name: DateFilterNames;
}

const FilterRadioBtn: React.FC<Props> = ({ name }) => {
  const { dateFilter, setDateFilter, setOtherPeriodEndDate, setOtherPeriodStartDate } = useFilters()
  const isChecked = (text: string) => {
    return dateFilter === text
  }

  const onPress = () => {
    setOtherPeriodEndDate(undefined)
    setOtherPeriodStartDate(undefined)
    setDateFilter(name)
  }

  return (
    <ListCheckboxBtn
      type="radio"
      title={name}
      isChecked={isChecked(name)}
      onPress={onPress}
    />
  )
}

export default FilterRadioBtn
