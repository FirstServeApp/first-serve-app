import { ButtonGroupContainer, TabWrap } from './styles'
import { TextS } from '../../styles/typography'
import COLORS from '../../styles/colors'
import { ToggleBtnsNames } from '../ToggleGroup'


export enum ButtonGroupNames {
  All = 'ALL',
  FirstSet = '1SET',
  SecondSet = '2SET',
  ThirdSet = '3SET',
}

type Props = {
  selectedBtn: ButtonGroupNames;
  setSelectedBtn: (tab: ButtonGroupNames) => void;
  mode?: ToggleBtnsNames;
}

const MatchButtonGroup: React.FC<Props> = ({ selectedBtn, setSelectedBtn, mode = ToggleBtnsNames.Stats }) => {
  const getTextColor = (button: ButtonGroupNames) => {
    return button === selectedBtn ? COLORS.black : COLORS.darkGrey
  }

  return (
    <ButtonGroupContainer>
      {mode === ToggleBtnsNames.Stats && (
        <TabWrap
          selected={selectedBtn === ButtonGroupNames.All}
          onPress={() => setSelectedBtn(ButtonGroupNames.All)}
        >
          <TextS additional color={getTextColor(ButtonGroupNames.All)}>All</TextS>
        </TabWrap>
      )}
      <TabWrap
        selected={selectedBtn === ButtonGroupNames.FirstSet}
        onPress={() => setSelectedBtn(ButtonGroupNames.FirstSet)}
      >
        <TextS additional color={getTextColor(ButtonGroupNames.FirstSet)}>1 set</TextS>
      </TabWrap>
      <TabWrap
        selected={selectedBtn === ButtonGroupNames.SecondSet}
        onPress={() => setSelectedBtn(ButtonGroupNames.SecondSet)}
      >
        <TextS additional color={getTextColor(ButtonGroupNames.SecondSet)}>2 set</TextS>
      </TabWrap>
      <TabWrap
        selected={selectedBtn === ButtonGroupNames.ThirdSet}
        onPress={() => setSelectedBtn(ButtonGroupNames.ThirdSet)}
      >
        <TextS additional color={getTextColor(ButtonGroupNames.ThirdSet)}>3 set</TextS>
      </TabWrap>
    </ButtonGroupContainer>
  )
}

export default MatchButtonGroup
