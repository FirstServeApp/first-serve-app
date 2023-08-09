import React, { useState } from 'react'
import DateFilterPopup from './DateFilterPopup'
import DefaultPopup from './DefaultPopup'
import OtherDatePopup from './OtherDatePopup'


type Props = {
  visible: boolean;
  onClose: () => void;
}

const FiltersPopup: React.FC<Props> = ({ visible, onClose }) => {
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [showOtherDateFilter, setShowOtherDateFilter] = useState(false)

  return (
    <>
      <DefaultPopup visible={visible} onClose={onClose} setShowDateFilter={setShowDateFilter} />
      <DateFilterPopup
        visible={showDateFilter}
        onClose={() => setShowDateFilter(false)}
        onOtherPeriodOpen={() => setShowOtherDateFilter(true)}
      />
      <OtherDatePopup visible={showOtherDateFilter} onClose={() => setShowOtherDateFilter(false)} />
    </>
  )
}

export default FiltersPopup
