import React, { useMemo } from 'react'
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


type Props = {
  visible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<Props> = ({ visible, onClose }) => {
  const { logout, user, deleteAccount } = useAuth()
  const height = useMemo(() => ['75%'], [])

  return (
    <BottomSheetPopup2
      visible={visible}
      onClose={onClose}
      snapPoints={height}
    >
      <ProfilePopupContainer>
        <Avatar type="L" />
        <ProfileInfoContainer>
          <Input
            value={user?.name || 'Konstantin'}
            editable={false}
          />
          <Input
            value={user?.email || 'konstantinivanov@mail.com'}
            editable={false}
          />
        </ProfileInfoContainer>
        <BtnsListContainer>
          <ListButton
            title="Contact us"
            leftIcon="mail"
            showRightChevron
            onPress={() => openURL('mailto:test@gmail.com')}
          />
          <ListButton
            title="Log out"
            leftIcon="logout"
            onPress={() => {
              onClose()
              logout()
            }}
          />
          <ListButton
            title="Delete account"
            leftIcon="trash"
            showRightChevron={false}
            onPress={() => {
              onClose()
              deleteAccount()
            }}
            dangerZone
          />
        </BtnsListContainer>
        <BottomBtnContainer>
          <ButtonComponent title="Save" onPress={onClose} />
        </BottomBtnContainer>
      </ProfilePopupContainer>
    </BottomSheetPopup2>
  )
}

export default ProfilePopup
