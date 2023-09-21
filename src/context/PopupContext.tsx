import { ReactNode, createContext, useContext, useState } from 'react'
import ConfirmPopup from '../components/MatchPopup/ConfirmPopup'
import ButtonComponent from '../components/UI/Button'
import matchService from '../services/matchService'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../navigation/AuthenticatedNavigation'
import ProfilePopup from '../components/ProfilePopup'
import FiltersPopup from '../components/FiltersPopup'


export enum PopupNames {
  DeleteMatch = 'DELETE_MATCH',
  Profile = 'PROFILE',
  Filters = 'FILTERS',
  PlayerFilters = 'PLAYER_FILTERS',
  DateFilters = 'DATE_FILTERS',
  OtherPeriodFilter = 'OTHER_PERIOD_FILTER',
}

export type PopupContextData = {
  showPopup(name: PopupNames): void,
  closeAll(): void,
  setMatchId(value: string): void;
  visiblePopup?: PopupNames;
}

const PopupContext = createContext<PopupContextData>({} as PopupContextData)

export const usePopup= (): PopupContextData => {
  const context = useContext(PopupContext)

  if (!context) {
    throw new Error('usePopup must be used within an PopupProvider')
  }

  return context
}

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [visiblePopup, setVisiblePopup] = useState<PopupNames | undefined>()
  const [matchId, setMatchId] = useState<string>('')

  const closeAll = (): void => {
    setVisiblePopup(undefined)
  }

  const showPopup = (name: PopupNames): void => {
    setVisiblePopup(name)
  }

  const popupContextValue: PopupContextData = {
    showPopup,
    closeAll,
    setMatchId,
    visiblePopup,
  }

  const deleteMatch = async () => {
    setLoading(true)

    await matchService
      .deleteMatch(matchId)
      .then(() => {
        closeAll()
        navigation.navigate('Home')
      })
      .finally(() => setLoading(false))
  }

  return (
    <PopupContext.Provider value={popupContextValue}>
      {children}
      <ConfirmPopup
        title={'Are you sure you want\nto delete the match?'}
        height="25%"
        visible={visiblePopup === PopupNames.DeleteMatch}
        onClose={closeAll}
      >
        <ButtonComponent title="Cancel" type="secondary" onPress={closeAll} />
        <ButtonComponent
          title="Yes"
          loading={isLoading}
          onPress={deleteMatch}
        />
      </ConfirmPopup>
      <ProfilePopup visible={visiblePopup === PopupNames.Profile} onClose={closeAll} />
      <FiltersPopup onClose={closeAll} visible={visiblePopup === PopupNames.Filters} />
    </PopupContext.Provider>
  )
}
