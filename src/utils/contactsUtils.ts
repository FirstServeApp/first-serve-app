import * as Contacts from 'expo-contacts'

export type GroupedContacts = {
  [key: string]: Contacts.Contact[];
}

export const groupContactsByLetter = (contacts: Contacts.Contact[]) => {
  const groupedData: GroupedContacts = {}

  contacts.forEach(contact => {
    const firstLetter = contact.name?.charAt(0).toUpperCase()
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = []
    }
    groupedData[firstLetter].push(contact)
  })

  return groupedData
}
