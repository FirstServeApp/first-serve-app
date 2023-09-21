import React, { ReactNode } from 'react'
import BottomSheetPopup from '../UI/BottomSheet'
import {
  MatchPopupContainer,
  HeaderWrap,
  PopupBtnsContainer,
  ConfirmSubtitleWrap,
  PopupBtn,
  HeaderBlock,
} from './styles'
import { Header3, TextL } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


type Props = {
  visible: boolean;
  onClose(): void;
  title: string;
  subtitle?: string;
  children: ReactNode[];
  height: string;
}

const ConfirmPopup: React.FC<Props> = ({ visible, onClose, title, subtitle, height, children }) => {
  const { bottom } = useSafeAreaInsets()
  return (
    <BottomSheetPopup
      visible={visible}
      onClose={onClose}
      snapPoints={[height]}
    >
      <MatchPopupContainer bottomInset={bottom}>
        <HeaderBlock>
          <HeaderWrap>
            <Header3>{title}</Header3>
            <IconBtn icon="cancel" type="light" onPress={onClose} />
          </HeaderWrap>
          {subtitle && (
            <ConfirmSubtitleWrap>
              <TextL additional>{subtitle}</TextL>
            </ConfirmSubtitleWrap>
          )}
        </HeaderBlock>
        <PopupBtnsContainer>
          <PopupBtn>{children[0]}</PopupBtn>
          <PopupBtn>{children[1]}</PopupBtn>
        </PopupBtnsContainer>
      </MatchPopupContainer>
    </BottomSheetPopup>
  )
}

export default ConfirmPopup
