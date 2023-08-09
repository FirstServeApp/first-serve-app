import React, { useState } from 'react'
import COLORS from '../../../styles/colors'
import { SearchBarContainer, SearchBarField } from './styles'
import { Icon } from '../Icon'


type Props = {
  onChange(query: string): void;
}

const SearchBar: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState<string>()

  return (
    <SearchBarContainer>
      <Icon name="search" />
      <SearchBarField
        placeholder="Search"
        placeholderTextColor={COLORS.darkGrey}
        cursorColor={COLORS.black}
        onChangeText={onChange}
        // value={value}
        maxLength={16}
        textAlignVertical="center"
      />
    </SearchBarContainer>
  )
}

export default SearchBar
