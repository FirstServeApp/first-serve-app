import React, { ReactNode } from 'react'
import {
  MatchPopupContainer,
  HeaderWrap,
  ConfirmPopupHeader,
  PopupBtnsContainer,
  PopupBtn,
  HeaderBlock,
} from '../MatchPopup/styles'
import IconBtn from '../UI/Button/IconBtn'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheetPopup2 from '../UI/BottomSheet/BottomSheetPopup'


type Props = {
  visible: boolean;
  onClose(): void;
  children: ReactNode[];
}

const DeleteMatchPopup: React.FC<Props> = ({ visible, onClose, children }) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <BottomSheetPopup2
      visible={visible}
      onClose={onClose}
    >
      <MatchPopupContainer bottomInset={bottom}>
        <HeaderBlock>
          <HeaderWrap>
            <ConfirmPopupHeader>Are you sure you want to delete the match?</ConfirmPopupHeader>
            <IconBtn icon="cancel" type="light" onPress={onClose} />
          </HeaderWrap>
        </HeaderBlock>
        <PopupBtnsContainer>
          <PopupBtn>{children[0]}</PopupBtn>
          <PopupBtn>{children[1]}</PopupBtn>
        </PopupBtnsContainer>
      </MatchPopupContainer>
    </BottomSheetPopup2>
  )
}

export default DeleteMatchPopup
