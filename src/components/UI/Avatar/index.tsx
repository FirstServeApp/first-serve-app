import IconBtn from '../Button/IconBtn'
import { AvatarImage, AvatarLargeContainer, IconContainer } from './styles'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../../../context/AuthContext'
import UserService from '../../../services/UserService'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useState } from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { TextS } from '../../../styles/typography'
import COLORS from '../../../styles/colors'

type Props = {
  type?: 'S' | 'L';
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_URL = 'https://res.cloudinary.com/dvrhccuyh/image/upload/v1689092116/app-images/avatar-large_pwatuc.png'

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 16,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: 200,
    borderRadius: 12,
    flexDirection: 'column',
    zIndex: 99,
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: '#00000010',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 60,
  },
})

type ChangeAvatarBtnsProps = {
  y: number
  x: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeAvatarBtns = ({ y, x, setLoading, setShow }: ChangeAvatarBtnsProps) => {
  const boxStyles = StyleSheet.create({ container: { top: y, right: x } })
  const { setupAvatar } = useAuth()

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

    setShow(false)
  }

  const deleteImage = async () => {
    setLoading(true)
    setupAvatar(DEFAULT_URL)

    await UserService.changeAvatar(DEFAULT_URL)
      .finally(() => setLoading(false))

    setShow(false)
  }
  return (
    <Animated.View
      key="uniqueksjcbnkds"
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(200)}
      style={[styles.container, boxStyles.container]}>
      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <TextS>Change photo</TextS>
        <TextS>􀏅</TextS>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={deleteImage}>
        <TextS color={COLORS.red}>Delete photo</TextS>
        <TextS color={COLORS.red}>􀈑</TextS>
      </TouchableOpacity>
    </Animated.View>
  )
}

const Avatar: React.FC<Props> = ({ type = 'S', show, setShow }) => {
  const { avatar } = useAuth()
  const [loading, setLoading] = useState(false)


  if (type === 'S') {
    return (
      <AvatarImage
        type={type}
        source={{ uri: avatar || DEFAULT_URL }}
      />
    )
  }

  if (!setShow) {
    return null
  }

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  return (
    <>
      <AvatarLargeContainer
        onLayout={event => {
          setX(event.nativeEvent.layout.x)
          setY(event.nativeEvent.layout.y + event.nativeEvent.layout.height + 5)
        }}
      >
        <AvatarImage
          type={type}
          source={{ uri: avatar || DEFAULT_URL }}
        >
          {loading && <ActivityIndicator size="large" color="black" />}
        </AvatarImage>
        <IconContainer>
          <IconBtn
            icon="camera"
            type="black"
            onPress={() => {
              setShow(prev => !prev)
            }}
          />
        </IconContainer>
      </AvatarLargeContainer>
      {show && <ChangeAvatarBtns x={x} y={y} setLoading={setLoading} setShow={setShow} />}
    </>
  )
}

export default Avatar
