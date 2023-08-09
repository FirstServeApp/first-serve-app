import { useState } from 'react'
import MatchButtonGroup, { ButtonGroupNames } from '../MatchButtonGroup'
import { ToggleBtnsNames } from '../ToggleGroup'
import {
  MatchHistoryList,
} from './styles'
import { Match, Set } from '../../services/matchService'
import HistoryCard from './HistoryCard'


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
        <MatchButtonGroup selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} mode={ToggleBtnsNames.History} />
      )}
      <MatchHistoryList>
        <HistoryCard games={data.sets[getIndex(selectedBtn, data.sets.length)].games} />
      </MatchHistoryList>
    </>
  )
}

export default MatchHistory
