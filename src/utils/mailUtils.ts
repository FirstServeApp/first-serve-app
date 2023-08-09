import { Linking, Platform } from 'react-native'

type EmailApp = 'gmail' | 'yahoo' | 'outlook'

const openEmailApp = async (app: EmailApp): Promise<void> => {
  let url: string

  switch (app) {
    case 'gmail':
      url = 'https://gmail.com'
      break
    case 'outlook':
      url = 'https://outlook.com'
      break
    case 'yahoo':
      url = 'https://mail.yahoo.com'
      break
    default:
      throw new Error('Invalid email app')
  }

  await await Linking.openURL(url)
}

export default openEmailApp
