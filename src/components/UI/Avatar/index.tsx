import IconBtn from '../Button/IconBtn'
import { AvatarImage, AvatarLargeContainer, IconContainer } from './styles'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../../../context/AuthContext'
import UserService from '../../../services/UserService'
import { ActivityIndicator } from 'react-native'
import { useState } from 'react'

type Props = {
  type?: 'S' | 'L';
}

const DEFAULT_URL = 'https://res.cloudinary.com/dvrhccuyh/image/upload/v1689092116/app-images/avatar-large_pwatuc.png'

const Avatar: React.FC<Props> = ({ type = 'S' }) => {
  const { setupAvatar, avatar } = useAuth()
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
      base64: true,
    })

    if (!result.canceled) {
      setLoading(true)
      setupAvatar(DEFAULT_URL)
      const image = `data:image/${result.assets[0].uri.split('.').pop()};base64,${result.assets[0].base64}`

      const imageUrl = await UserService.changeAvatar(image)

      if (imageUrl) {
        setupAvatar(imageUrl.data.imageUrl)
        setLoading(false)
      }
    }
  }

  if (type === 'S') {
    return (
      <AvatarImage
        type={type}
        source={{ uri: avatar || DEFAULT_URL }}
      />
    )
  }

  return (
    <AvatarLargeContainer>
      <AvatarImage
        type={type}
        source={{ uri: avatar || DEFAULT_URL }}
      >
        {loading && <ActivityIndicator size="large" color="black" />}
      </AvatarImage>
      <IconContainer>
        <IconBtn icon="camera" type="black" onPress={pickImage} />
      </IconContainer>
    </AvatarLargeContainer>
  )
}

export default Avatar
