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
import IconBtn from '../UI/Button/IconBtn'
import { getMatchCount } from '../../utils/matchUtils'
import Loader from '../UI/Loader'
import { Illustration } from '../UI/Illustration'
import { useFilters, DateFilterNames } from '../../context/FiltersContext'
import PauseMatchCard from './PauseMatchCard'


type Props = {
  setFiltersVisible: (value: boolean) => void;
  data: Match<GetAllSet>[];
  isLoading: boolean;
}

export const MatchList: React.FC<Props> = ({ setFiltersVisible, data, isLoading = true }) => {
  const { dateFilter, playersFilter, otherPeriodStartDate, otherPeriodEndDate } = useFilters()

  const showLoader = isLoading === undefined ? true : isLoading

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

  if (showLoader) {
    return <NoMatchesContainer><Loader /></NoMatchesContainer>
  }

  if (data?.length > 0) {
    return (
      <>
        <FilterBlock>
          <Header3>{getMatchCount(filteredData.length)}</Header3>
          <IconBtn icon="filters" type="light" onPress={() => setFiltersVisible(true)} />
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
    return (
      <NoMatchesContainer>
        <NoMatchesIllustrationWrap>
          <Illustration name="no-matches" />
        </NoMatchesIllustrationWrap>
        <NoMatchesSubtitle>
          Here will be the history of your matches, to start a new match click the button below
        </NoMatchesSubtitle>
      </NoMatchesContainer>
    )
  }
}

export default MatchList
