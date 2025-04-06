import React, { useCallback, useEffect, useState } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { Container, ChooseFromContactsHeader, ButtonContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import SearchBar from '../../components/UI/Input/SearchBar'
import * as Contacts from 'expo-contacts'
import { groupContactsByLetter, GroupedContacts } from '../../utils/contactsUtils'
import ContactList from '../../components/ContactList'
import { useMatch } from '../../context/MatchContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'ChooseFromContacts'>

const ChooseFromContactsScreen: React.FC<Props> = React.memo(({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [contacts, setContacts] = useState<GroupedContacts>({})
  const [filteredList, setFilteredList] = useState(contacts)
  const [selectedContact, setSelectedContact] = useState<string>('')
  const { setNewOpponentName } = useMatch()

  const filterBySearch = useCallback((query: string) => {
    const filteredData: GroupedContacts = {}
    Object.keys(contacts).forEach(key => {
      const filteredContacts = contacts[key].filter(contact => {
        return contact.name.toLowerCase().includes(query.toLowerCase())
      }).sort()
      if (filteredContacts.length > 0) {
        filteredData[key] = filteredContacts
      }
    })
    setFilteredList(filteredData)
  }, [contacts])

  useEffect(() => {
    const loadContacts = async () => {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name],
      })

      if (data.length > 0) {
        const groupedData = groupContactsByLetter(data)

        setContacts(groupedData)
        setFilteredList(groupedData)
      }
    }

    loadContacts()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <ChooseFromContactsHeader>
          <SearchBar onChange={filterBySearch} />
        </ChooseFromContactsHeader>
        <Container>
          <ContactList
            contact={selectedContact}
            setContact={setSelectedContact} data={filteredList}
            player={route.params.player} />
          {selectedContact && (
            <ButtonContainer>
              <ButtonComponent
                title="Select contact" size="M"
                onPress={() => {
                  setNewOpponentName(selectedContact)
                  if (route.params.from.name === 'PlayerDetails') {
                    // navigation.navigate('PlayerDetails')
                    navigation.goBack()
                  } else {
                    navigation.navigate('EditMatch', {
                      id: route.params.from.params.id,
                      opponentName: selectedContact,
                    })
                  }
                  // navigation.goBack()
                }}
              />
            </ButtonContainer>
          )}
        </Container>
      </>
    </TouchableWithoutFeedback>
  )
})

export default ChooseFromContactsScreen
