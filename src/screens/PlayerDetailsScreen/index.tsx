import React, { useEffect } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { TextS } from '../../styles/typography'
import { Container, TextContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import COLORS from '../../styles/colors'
import * as Contacts from 'expo-contacts'
import OneFieldForm from '../../components/OneFieldForm'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OpponentNameFormData, opponentNameSchema } from '../../validations/matchValidations'
import { useMatch } from '../../context/MatchContext'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getButtonsBlockStyles, keyboardDidHideListener, keyboardDidShowListener } from '../../utils/keyboardUtils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'PlayerDetails'>

const PlayerDetailsScreen: React.FC<Props> = React.memo(({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { opponentName, setOpponentName, newOpponentName, setNewOpponentName } = useMatch()
  const methods = useForm<OpponentNameFormData>({
    resolver: yupResolver(opponentNameSchema),
    mode: 'all',
    defaultValues: {
      opponentName: 'Opponent',
    },
  })
  const [keyboardOffset, setKeyboardOffset] = React.useState(0)
  const { bottom } = useSafeAreaInsets()
  const { buttonsBlock, onKeyboardOpen } = getButtonsBlockStyles(bottom, keyboardOffset)

  const onChooseFromContacts = async () => {
    const permisson = await Contacts.requestPermissionsAsync()
    if (permisson.granted) {
      navigation.navigate('ChooseFromContacts', { player: 'opponent', from: route })
    }
  }

  const onSave = () => {
    methods.handleSubmit(data => {
      if (data.opponentName) {
        setOpponentName(data.opponentName)
      } else {
        setOpponentName('Opponent')
      }

      navigation.navigate('StartMatch')
    })()
  }

  useEffect(() => {
    if (!!newOpponentName) {
      methods.setValue('opponentName', newOpponentName)
    } else if (!!opponentName) {
      methods.setValue('opponentName', opponentName)
    }
  }, [opponentName, methods, newOpponentName])

  useEffect(() => {
    // setSelectedContact(opponentName)
    const show = keyboardDidShowListener(setKeyboardOffset)
    const hide = keyboardDidHideListener(setKeyboardOffset)
    return () => {
      setNewOpponentName('')
      show.remove()
      hide.remove()
    }
  }, [])

  return (
    <Container>
      <View>
        <TextContainer>
          <TextS color={COLORS.darkGrey}>Player name</TextS>
        </TextContainer>
        <FormProvider {...methods}>
          <OneFieldForm
            name="opponentName"
            placeholder="Opponent"
            maxLength={48}
          />
        </FormProvider>
      </View>
      <View style={[buttonsBlock, !!keyboardOffset && onKeyboardOpen]}>
        <ButtonComponent title="Save" onPress={onSave} />
        <ButtonComponent
          title="Select from contacts"
          type="secondary"
          icon="group"
          onPress={onChooseFromContacts}
        />
      </View>
    </Container>
  )
})

export default PlayerDetailsScreen
