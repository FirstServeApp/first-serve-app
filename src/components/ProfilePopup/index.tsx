import React from 'react'
import BottomSheetPopup from '../UI/BottomSheet'
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


type Props = {
  visible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<Props> = ({ visible, onClose }) => {
  const { logout, user, deleteAccount } = useAuth()

  return (
    <BottomSheetPopup
      visible={visible}
      onClose={onClose}
      snapPoints={['78%']}
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
          <ListButton title="Contact us" leftIcon="mail" showRightChevron />
          <ListButton title="Log out" leftIcon="logout" onPress={logout} />
          <ListButton
            title="Delete account"
            leftIcon="trash"
            showRightChevron={false}
            onPress={() => deleteAccount()}
            dangerZone
          />
        </BtnsListContainer>
        <BottomBtnContainer>
          <ButtonComponent title="Save" />
        </BottomBtnContainer>
      </ProfilePopupContainer>
    </BottomSheetPopup>
  )
}

export default ProfilePopup
