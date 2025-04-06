/* eslint-disable react-native/no-inline-styles */
import { memo, useState } from 'react'
import MatchButtonGroup, { ButtonGroupNames } from '../MatchButtonGroup'
import { ToggleBtnsNames } from '../ToggleGroup'
import {
  MatchHistoryList,
  EmptyHistoryContainer,
} from './styles'
import { Match, Set } from '../../services/matchService'
import HistoryCard from './HistoryCard'
import { Illustration } from '../UI/Illustration'
import { TextL } from '../../styles/typography'
import COLORS from '../../styles/colors'


type Props = {
  data: Match<Set>;
}

const getIndex = (value: ButtonGroupNames, setsArrLength: number) => {
  if (setsArrLength === 1) {
    return 0
  }

  switch (value) {
    case ButtonGroupNames.FirstSet:
      return 0
    case ButtonGroupNames.SecondSet:
      return 1
    case ButtonGroupNames.ThirdSet:
      return 2
    default:
      return 0
  }
}

const MatchHistory: React.FC<Props> = ({ data }) => {
  const [selectedBtn, setSelectedBtn] = useState<ButtonGroupNames>(ButtonGroupNames.FirstSet)

  return (
    <>
      {data.sets.length > 1 && (
        <MatchButtonGroup
          setsCount={data.sets.length}
          selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn}
          mode={ToggleBtnsNames.History} />
      )}
      {data.sets[getIndex(selectedBtn, data.sets.length)].games.length === 0 && (
        <EmptyHistoryContainer>
          <Illustration name="empty-history" />
          <TextL color={COLORS.darkGrey} style={{ textAlign: 'center' }}>
            There is no match history{'\n'}in the game
          </TextL>
        </EmptyHistoryContainer>
      )}
      {data.sets[getIndex(selectedBtn, data.sets.length)].games.length > 0 && (
        <MatchHistoryList>
          <HistoryCard games={data.sets[getIndex(selectedBtn, data.sets.length)].games} />
        </MatchHistoryList>
      )}
    </>
  )
}

export default memo(MatchHistory)
