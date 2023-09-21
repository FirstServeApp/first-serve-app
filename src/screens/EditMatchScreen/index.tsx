import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { TextS } from '../../styles/typography'
import { TextContainer, SettingsBlock } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import COLORS from '../../styles/colors'
import * as Contacts from 'expo-contacts'
import OneFieldForm from '../../components/OneFieldForm'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OpponentNameFormData, opponentNameSchema } from '../../validations/matchValidations'
import matchService from '../../services/matchService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, ButtonsBlock } from '../../components/UI/Container'
import { usePopup } from '../../context/PopupContext'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'


type Props = NativeStackScreenProps<AuthenticatedStackParams, 'EditMatch'>

const EditMatchScreen: React.FC<Props> = React.memo(({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { setMatchId } = usePopup()
  const [isLoading, setLoading] = useState(false)
  const methods = useForm<OpponentNameFormData>({
    resolver: yupResolver(opponentNameSchema),
    mode: 'all',
    defaultValues: {
      opponentName: route.params.opponentName,
    },
  })

  const onChooseFromContacts = async () => {
    const permisson = await Contacts.requestPermissionsAsync()
    if (permisson.granted) {
      navigation.navigate('ChooseFromContacts', { player: 'opponent' })
    }
  }

  const onSave = () => {
    setLoading(true)
    methods.handleSubmit(async data => {
      if (data.opponentName) {
        await matchService.changeOpponentName(data.opponentName, route.params.id)
      }

      navigation.navigate('Home')
    })().finally(() => setLoading(false))
  }

  useEffect(() => {
    setMatchId(route.params.id)
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <SettingsBlock>
          <TextContainer>
            <TextS color={COLORS.darkGrey}>Opponent name</TextS>
          </TextContainer>
          <FormProvider {...methods}>
            <OneFieldForm
              name="opponentName"
              placeholder="Opponent"
              maxLength={16}
            />
          </FormProvider>
        </SettingsBlock>
        <ButtonsBlock>
          <ButtonComponent title="Save" onPress={onSave} loading={isLoading} />
          <ButtonComponent
            title="Select from contacts"
            type="secondary"
            icon="group"
            onPress={onChooseFromContacts}
          />
        </ButtonsBlock>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
})

export default EditMatchScreen
