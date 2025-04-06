import React from 'react'
import { TextS } from '../../styles/typography'
import { GroupedContacts } from '../../utils/contactsUtils'
import { SectionList, TouchableOpacityProps } from 'react-native'
import { SectionTitleWrap, styles } from './styles'
import ListCheckboxBtn from '../UI/ListButton/ListCheckboxBtn'
import COLORS from '../../styles/colors'
import { useMatch } from '../../context/MatchContext'
import { Contact } from 'expo-contacts'


type SetContact = React.Dispatch<React.SetStateAction<string>>
type Props = {
  data: GroupedContacts;
  player: 'me' | 'opponent';
  setContact: SetContact;
  contact: string;
}
type ContactListItemProps = { item: Contact, setContact: SetContact, contact: string} & TouchableOpacityProps

const ContactListItem: React.FC<ContactListItemProps> = React.memo(({ item, setContact, contact, ...rest }) => {
  const onSelectContact = (name: string) => {
    setContact(name)
  }

  return (
    <ListCheckboxBtn
      title={item.name}
      isChecked={contact === item.name}
      type="radio"
      onPress={() => {
        if (contact === item.name) {
          return setContact('')
        }
        onSelectContact(item.name)
      }}
      {...rest}
    />
  )
})

const ContactList: React.FC<Props> = React.memo(({ data, setContact, contact }) => {
  const { opponentName } = useMatch()
  const sections = Object.keys(data).map(key => ({
    title: key,
    data: data[key],
  })).sort((a, b) => a.title.localeCompare(b.title))

  return (
    <SectionList
      sections={sections}
      initialNumToRender={15}
      style={opponentName ? styles.contactListContainer : styles.contactListContainerWithPaddingBottom}
      renderItem={({ item }) => <ContactListItem setContact={setContact} contact={contact} item={item} />}
      keyExtractor={item => item.id}
      renderSectionHeader={({ section }) => (
        <SectionTitleWrap>
          <TextS color={COLORS.darkGrey}>{section.title}</TextS>
        </SectionTitleWrap>
      )}
      stickySectionHeadersEnabled={false}
    />
  )
})

export default ContactList
