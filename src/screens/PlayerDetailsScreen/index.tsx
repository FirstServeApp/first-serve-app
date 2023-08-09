import React, { useEffect } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { TextS } from '../../styles/typography'
import { Container, TextContainer, SettingsBlock, ButtonsBlock } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import COLORS from '../../styles/colors'
import * as Contacts from 'expo-contacts'
import OneFieldForm from '../../components/OneFieldForm'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OpponentNameFormData, opponentNameSchema } from '../../validations/matchValidations'
import { useMatch } from '../../context/MatchContext'


const PlayerDetailsScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { opponentName, setOpponentName } = useMatch()
  const methods = useForm<OpponentNameFormData>({
    resolver: yupResolver(opponentNameSchema),
    mode: 'all',
  })

  const onChooseFromContacts = async () => {
    const permisson = await Contacts.requestPermissionsAsync()
    if (permisson.granted) {
      navigation.navigate('ChooseFromContacts', { player: 'opponent' })
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
    if (opponentName) {
      methods.setValue('opponentName', opponentName)
    }
  }, [opponentName, methods])

  return (
    <Container>
      <SettingsBlock>
        <TextContainer>
          <TextS color={COLORS.darkGrey}>Player name</TextS>
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
        <ButtonComponent title="Save" onPress={onSave} />
        <ButtonComponent
          title="Select from contacts"
          type="secondary"
          icon="group"
          onPress={onChooseFromContacts}
        />
      </ButtonsBlock>
    </Container>
  )
})

export default PlayerDetailsScreen
