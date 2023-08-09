import { ButtonGroupNames } from '../components/MatchButtonGroup'
import { MatchDetails } from '../services/matchService'

type DataItem = 'aces' | 'doubleFaults' | 'winners' | 'forcedErrors' | 'unforcedErrors' | 'totalWon' |
  'totalServiceWon' | 'totalReturnWon' | 'firstServes' | 'secondServes' | 'firstServePointsWon' |
  'secondServePointsWon' | 'breakPointsSaved' | 'breakPointsWon' | 'serviceGames' | 'returnGames'

const getTextByFieldName = (field: DataItem) => {
  switch (field) {
    case 'aces':
      return 'Aces'
    case 'doubleFaults':
      return 'Double faults'
    case 'winners':
      return 'Winners'
    case 'forcedErrors':
      return 'Forced errors'
    case 'unforcedErrors':
      return 'Unforced errors'
    case 'totalWon':
      return 'Total won'
    case 'totalServiceWon':
      return 'Total service won'
    case 'totalReturnWon':
      return 'Total return won'
    case 'firstServes':
      return '1st Serve in'
    case 'secondServes':
      return '2nd Serve in'
    case 'firstServePointsWon':
      return '1st Serve points won'
    case 'secondServePointsWon':
      return '2nd Serve points won'
    case 'breakPointsSaved':
    case 'breakPointsWon':
      return 'Break points won'
    case 'serviceGames':
      return 'Service Games'
    case 'returnGames':
      return 'Return Games'
    default:
      return null
  }
}

const getDataBySet = (selectedSet: ButtonGroupNames, item: string, data: MatchDetails) => {
  switch (selectedSet) {
    case ButtonGroupNames.FirstSet:
      return data[item as DataItem].bySet[0]
    case ButtonGroupNames.SecondSet:
      return data[item as DataItem].bySet[1]
    case ButtonGroupNames.ThirdSet:
      return data[item as DataItem].bySet[2]
    default:
      return data[item as DataItem].all
  }
}

export const getStatInfo = (data: MatchDetails, item: string, selectedSet: ButtonGroupNames) => {
  const myInfo = getDataBySet(selectedSet, item, data).me
  const oppInfo = getDataBySet(selectedSet, item, data).opponent

  return {
    title: getTextByFieldName(item as DataItem),
    myText: myInfo?.total ? `${myInfo.count}/${myInfo.total}` : myInfo.count,
    myPercent: myInfo?.total ? Math.floor(myInfo.count / myInfo.total * 100) : undefined,
    opponentText: oppInfo?.total ? `${oppInfo.count}/${oppInfo.total}` : oppInfo.count,
    opponentPercent: oppInfo?.total ? Math.floor(oppInfo.count / oppInfo.total * 100) : undefined,
  }
}
