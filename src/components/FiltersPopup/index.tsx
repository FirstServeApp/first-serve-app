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
      <DefaultPopup
        visible={visible}
        onClose={onClose}
        onOpen={() => {
          onClose()
          setShowDateFilter(true)
        }}
      />
      <DateFilterPopup
        visible={showDateFilter}
        onClose={() => setShowDateFilter(false)}
        onOpen={() => {
          setShowDateFilter(false)
          setShowOtherDateFilter(true)
        }}
      />
      <OtherDatePopup visible={showOtherDateFilter} onClose={() => setShowOtherDateFilter(false)} />
    </>
  )
}

export default FiltersPopup
