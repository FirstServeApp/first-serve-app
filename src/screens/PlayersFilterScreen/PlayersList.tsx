import React from 'react'
import { TextS } from '../../styles/typography'
import { SectionList } from 'react-native'
import { SectionTitleWrap, styles } from './styles'
import ListCheckboxBtn from '../../components/UI/ListButton/ListCheckboxBtn'
import COLORS from '../../styles/colors'
import { useFilters } from '../../context/FiltersContext'
import { GroupedPlayers } from '../../utils/matchUtils'


type Props = {
  data: GroupedPlayers;
}

const PlayersListItem: React.FC<{ item: string }> = React.memo(({ item }) => {
  const { playersFilter, setPlayersFilter } = useFilters()
  const onSelectContact = (name: string) => {
    if (playersFilter.includes(name)) {
      return setPlayersFilter(playersFilter.filter(item => item !== name))
    }

    return setPlayersFilter([...playersFilter, name])
  }

  return (
    <ListCheckboxBtn
      title={item}
      isChecked={playersFilter.includes(item)}
      type="checkbox"
      onPress={() => onSelectContact(item)}
    />
  )
})

const PlayersList: React.FC<Props> = React.memo(({ data }) => {
  const { playersFilter } = useFilters()
  const sections = Object.keys(data).map(key => ({
    title: key,
    data: data[key],
  }))

  return (
    <SectionList
      sections={sections}
      style={playersFilter ? styles.contactListContainer : styles.contactListContainerWithPaddingBottom}
      renderItem={({ item }) => <PlayersListItem item={item} />}
      keyExtractor={item => item}
      renderSectionHeader={({ section }) => (
        <SectionTitleWrap>
          <TextS color={COLORS.darkGrey}>{section.title}</TextS>
        </SectionTitleWrap>
      )}
    />
  )
})

export default PlayersList
