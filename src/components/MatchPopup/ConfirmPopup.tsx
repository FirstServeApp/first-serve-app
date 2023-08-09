import React, { ReactNode } from 'react'
import BottomSheetPopup from '../UI/BottomSheet'
import { MatchPopupContainer, HeaderWrap, PopupBtnsContainer, ConfirmSubtitleWrap } from './styles'
import { Header3, TextL } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'


type Props = {
  visible: boolean;
  onClose(): void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  height: string;
}

const ConfirmPopup: React.FC<Props> = ({ visible, onClose, title, subtitle, height, children }) => {
  return (
    <BottomSheetPopup
      visible={visible}
      onClose={onClose}
      snapPoints={[height]}
    >
      <MatchPopupContainer>
        <HeaderWrap>
          <Header3>{title}</Header3>
          <IconBtn icon="cancel" type="light" onPress={onClose} />
        </HeaderWrap>
        {subtitle && (
          <ConfirmSubtitleWrap>
            <TextL additional>{subtitle}</TextL>
          </ConfirmSubtitleWrap>
        )}
        <PopupBtnsContainer>
          {children}
        </PopupBtnsContainer>
      </MatchPopupContainer>
    </BottomSheetPopup>
  )
}

export default ConfirmPopup
