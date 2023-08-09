import React from 'react'
import { TextS } from '../../styles/typography'
import { GroupedContacts } from '../../utils/contactsUtils'
import { SectionList } from 'react-native'
import { SectionTitleWrap, styles } from './styles'
import ListCheckboxBtn from '../UI/ListButton/ListCheckboxBtn'
import COLORS from '../../styles/colors'
import { useMatch } from '../../context/MatchContext'
import { Contact } from 'expo-contacts'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'


type Props = {
  data: GroupedContacts;
  player: 'me' | 'opponent';
}

const ContactListItem: React.FC<{ item: Contact }> = React.memo(({ item }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { opponentName, setOpponentName } = useMatch()
  const onSelectContact = (name: string) => {
    setOpponentName(name)
    navigation.navigate('PlayerDetails')
  }

  return (
    <ListCheckboxBtn
      title={item.name}
      isChecked={opponentName === item.name}
      type="radio"
      onPress={() => onSelectContact(item.name)}
    />
  )
})

const ContactList: React.FC<Props> = React.memo(({ data }) => {
  const { opponentName } = useMatch()
  const sections = Object.keys(data).map(key => ({
    title: key,
    data: data[key],
  }))

  return (
    <SectionList
      sections={sections}
      style={opponentName ? styles.contactListContainer : styles.contactListContainerWithPaddingBottom}
      renderItem={({ item }) => <ContactListItem item={item} />}
      keyExtractor={item => item.id}
      renderSectionHeader={({ section }) => (
        <SectionTitleWrap>
          <TextS color={COLORS.darkGrey}>{section.title}</TextS>
        </SectionTitleWrap>
      )}
    />
  )
})

export default ContactList
