import { ReactNode, createContext, useContext, useState } from 'react'


export enum DateFilterNames {
  All = 'For all time',
  Day = 'Last day',
  Week = 'Last week',
  Month = 'Last month',
  Other = 'Other period',
}

export type FiltersContextData = {
  dateFilter: DateFilterNames;
  playersFilter: string[];
  otherPeriodStartDate: Date | undefined;
  otherPeriodEndDate: Date | undefined;
  setDateFilter(value: DateFilterNames): void;
  setPlayersFilter(value: string[]): void;
  setOtherPeriodStartDate(value: Date | undefined): void;
  setOtherPeriodEndDate(value: Date | undefined): void;
  isFiltersApplied: boolean;
  shouldMatchListRefreshIndicator: number;
  triggerMatchListRefresh(): void;
}

const FiltersContext = createContext<FiltersContextData>({} as FiltersContextData)

export const useFilters = (): FiltersContextData => {
  const context = useContext(FiltersContext)

  if (!context) {
    throw new Error('useFilters must be used within an FiltersProvider')
  }

  return context
}

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dateFilter, setDateFilter] = useState<DateFilterNames>(DateFilterNames.All)
  const [otherPeriodStartDate, setOtherPeriodStartDate] = useState<Date | undefined>()
  const [otherPeriodEndDate, setOtherPeriodEndDate] = useState<Date | undefined>()
  const [playersFilter, setPlayersFilter] = useState<string[]>([])
  const [shouldMatchListRefreshIndicator, setShouldMatchListRefreshIndicator] = useState(0)
  const isFiltersApplied = playersFilter.length > 0 || dateFilter !== DateFilterNames.All

  const triggerMatchListRefresh = () => {
    setShouldMatchListRefreshIndicator(prev => prev++)
  }

  const filtersContextValue: FiltersContextData = {
    dateFilter,
    playersFilter,
    otherPeriodStartDate,
    otherPeriodEndDate,
    setDateFilter,
    setPlayersFilter,
    setOtherPeriodStartDate,
    setOtherPeriodEndDate,
    isFiltersApplied,
    shouldMatchListRefreshIndicator,
    triggerMatchListRefresh,
  }

  return (
    <FiltersContext.Provider value={filtersContextValue}>
      {children}
    </FiltersContext.Provider>
  )
}
