import {
  MatchListContainer,
  FilterBlock,
  NoMatchesContainer,
  NoMatchesIllustrationWrap,
  NoMatchesSubtitle,
} from './styles'
import MatchCard from './MatchCard'
import { Match, GetAllSet } from '../../services/matchService'
import { Header3 } from '../../styles/typography'
import { getMatchCount } from '../../utils/matchUtils'
import Loader from '../UI/Loader'
import { Illustration } from '../UI/Illustration'
import { useFilters, DateFilterNames } from '../../context/FiltersContext'
import { FilterIconButton } from '../UI/Button/FilterIconButton'
import { PopupNames, usePopup } from '../../context/PopupContext'
import PauseMatchCard from './PausedMatchCard'
import { memo } from 'react'


type Props = {
  data: Match<GetAllSet>[];
  isLoading: boolean;
}

export const MatchList: React.FC<Props> = memo(({ data, isLoading = true }) => {
  const { dateFilter, playersFilter, otherPeriodStartDate, otherPeriodEndDate, isFiltersApplied } = useFilters()
  const { showPopup } = usePopup()

  const filteredData = data.filter(match => {
    const matchDate = new Date(match.createdAt)
    const currentDate = new Date()

    switch (dateFilter) {
      case DateFilterNames.All:
        return true
      case DateFilterNames.Day:
        const twentyFourHoursAgo = new Date()
        twentyFourHoursAgo.setDate(currentDate.getDate() - 1)
        return matchDate >= twentyFourHoursAgo
      case DateFilterNames.Week:
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(currentDate.getDate() - 7)
        return matchDate >= sevenDaysAgo
      case DateFilterNames.Month:
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(currentDate.getMonth() - 1)
        return matchDate >= oneMonthAgo
      case DateFilterNames.Other:
        if (otherPeriodStartDate && otherPeriodEndDate) {
          const start = new Date(otherPeriodStartDate)
          const end = new Date(otherPeriodEndDate)
          return matchDate >= start && matchDate <= end
        }
        return true
      default:
        return true
    }
  }).filter(match => {
    if (playersFilter.length === 0) {
      return true
    }

    return playersFilter.includes(match.opponentName)
  })

  if (!isLoading && (data === undefined || data.length === 0)) {
    return (
      <NoMatchesContainer>
        <NoMatchesIllustrationWrap>
          <Illustration name="no-matches" />
        </NoMatchesIllustrationWrap>
        <NoMatchesSubtitle>
          {'Here will be the history\nof your matches'}
        </NoMatchesSubtitle>
      </NoMatchesContainer>
    )
  } else if (data?.length > 0 && !isLoading) {
    return (
      <>
        <FilterBlock>
          <Header3>{getMatchCount(filteredData.length)}</Header3>
          <FilterIconButton isFilterApplied={isFiltersApplied} onPress={() => showPopup(PopupNames.Filters)} />
        </FilterBlock>
        <MatchListContainer>
          <PauseMatchCard />
          {filteredData.map(item => (
            <MatchCard key={item._id} data={item} />
          ))}
        </MatchListContainer>
      </>
    )
  } else {
    return <NoMatchesContainer><Loader /></NoMatchesContainer>
  }
})

export default MatchList
