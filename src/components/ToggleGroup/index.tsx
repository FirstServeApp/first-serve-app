import COLORS from '../../styles/colors'
import { TextL } from '../../styles/typography'
import {
  ToggleGroupContainer,
  ButtonsBlock,
  BtnWrap,
  BtnUnderline,
  Driver,
} from './styles'


export enum ToggleBtnsNames {
  Stats = 'STATS',
  History = 'HISTORY',
}

type Props = {
  selectedBtn: ToggleBtnsNames;
  setSelectedBtn: (button: ToggleBtnsNames) => void;
}

const ToggleGroup: React.FC<Props> = ({ selectedBtn, setSelectedBtn }) => {
  const getTextColor = (button: ToggleBtnsNames) => {
    return button === selectedBtn ? COLORS.black : COLORS.grey
  }

  return (
    <ToggleGroupContainer>
      <ButtonsBlock>
        <BtnWrap onPress={() => setSelectedBtn(ToggleBtnsNames.Stats)}>
          <TextL color={getTextColor(ToggleBtnsNames.Stats)}>Stats</TextL>
          {selectedBtn === ToggleBtnsNames.Stats && <BtnUnderline />}
        </BtnWrap>
        <BtnWrap onPress={() => setSelectedBtn(ToggleBtnsNames.History)}>
          <TextL color={getTextColor(ToggleBtnsNames.History)}>History</TextL>
          {selectedBtn === ToggleBtnsNames.History && <BtnUnderline />}
        </BtnWrap>
      </ButtonsBlock>
      <Driver />
    </ToggleGroupContainer>
  )
}

export default ToggleGroup
