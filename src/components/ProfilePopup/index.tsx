/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import Input from '../UI/Input'
import {
  ProfilePopupContainer,
  ProfileInfoContainer,
  BtnsListContainer,
  BottomBtnContainer,
} from './styles'
import Avatar from '../UI/Avatar'
import ButtonComponent from '../UI/Button'
import { useAuth } from '../../context/AuthContext'
import ListButton from '../UI/ListButton'
import { openURL } from 'expo-linking'
import BottomSheetPopup2 from '../UI/BottomSheet/BottomSheetPopup'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeNameFormData, changeNameSchema } from '../../validations/authValidations'
import OneFieldForm from '../OneFieldForm'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconBtn from '../UI/Button/IconBtn'
import COLORS from '../../styles/colors'
import { TouchableWithoutFeedback } from 'react-native'


type Props = {
  visible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<Props> = ({ visible, onClose }) => {
  const { logout, user, deleteAccount, changeName } = useAuth()
  const [isLoading, setLoading] = useState(false)
  const [showChangeAvatarModal, setShowChangeAvatarModal] = useState(false)
  const methods = useForm<ChangeNameFormData>({
    resolver: yupResolver(changeNameSchema),
    mode: 'onBlur',
    values: { name: user?.name || '' },
  })
  const { bottom } = useSafeAreaInsets()

  const onSubmit: SubmitHandler<ChangeNameFormData> = async data => {
    setLoading(true)
    await changeName(data.name)
      .finally(() => {
        setLoading(false)
        onClose()
      })
  }

  const close = () => {
    onClose()
    setShowChangeAvatarModal(false)
    methods.reset()
  }

  return (
    <BottomSheetPopup2
      visible={visible}
      onClose={close}
    >
      <TouchableWithoutFeedback onPress={() => setShowChangeAvatarModal(false)}>
        <ProfilePopupContainer bottomInset={bottom}>
          <IconBtn
            icon="cancel" type="light"
            onPress={close}
            style={{ position: 'absolute', top: -12, right: 12 }}
          />
          <Avatar type="L" show={showChangeAvatarModal} setShow={setShowChangeAvatarModal} />
          <ProfileInfoContainer>
            <FormProvider {...methods}>
              <OneFieldForm
                autoFocus={false}
                placeholder="Name"
                autoComplete="name"
                maxLength={128}
                name="name"
              />
            </FormProvider>
            <Input
              value={user?.email || 'konstantinivanov@mail.com'}
              style={{ color: COLORS.darkGrey, textAlignVertical: 'center' }}
              verticalAlign="middle"
              editable={false}
            />
          </ProfileInfoContainer>
          <BtnsListContainer>
            <ListButton
              title="Contact us"
              leftIcon="mail"
              showRightChevron
              onPress={() => openURL('mailto:info@firstserve.app')}
            />
            <ListButton
              title="Log out"
              leftIcon="logout"
              onPress={() => {
                close()
                logout()
              }}
            />
            <ListButton
              title="Delete account"
              leftIcon="trash"
              showRightChevron={false}
              onPress={() => {
                close()
                deleteAccount()
              }}
              dangerZone
            />
          </BtnsListContainer>
          <BottomBtnContainer>
            <ButtonComponent
              title="Save"
              loading={isLoading}
              disabled={!methods.formState.isDirty || !methods.formState.isValid}
              onPress={methods.handleSubmit(onSubmit)}
            />
          </BottomBtnContainer>
        </ProfilePopupContainer>
      </TouchableWithoutFeedback>
    </BottomSheetPopup2>
  )
}

export default ProfilePopup
