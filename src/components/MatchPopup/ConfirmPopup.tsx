import React, { ReactNode } from 'react'
import {
  HeaderWrap,
  ConfirmPopupHeader,
  PopupBtnsContainer,
  PopupBtn,
  HeaderBlock,
} from './styles'
import { TextL } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'


type Props = {
  onClose(): void;
  title: string;
  subtitle?: string;
  children: ReactNode[];
}

const ConfirmPopup: React.FC<Props> = ({ onClose, title, subtitle, children }) => (
  <>
    <HeaderBlock>
      <HeaderWrap>
        <ConfirmPopupHeader>{title}</ConfirmPopupHeader>
        <IconBtn icon="cancel" type="flat" onPress={onClose} />
      </HeaderWrap>
      {subtitle && <TextL additional>{subtitle}</TextL>}
    </HeaderBlock>
    <PopupBtnsContainer>
      <PopupBtn>{children[0]}</PopupBtn>
      <PopupBtn>{children[1]}</PopupBtn>
    </PopupBtnsContainer>
  </>
)

export default ConfirmPopup
