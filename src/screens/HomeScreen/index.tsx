import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { HomeContainer, BottomContainer } from './styles'
import HomeHeader from '../../components/HomeHeader'
import { MatchList } from '../../components/MatchList'
import { ScrollView } from 'react-native'
import ButtonComponent from '../../components/UI/Button'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ProfilePopup from '../../components/ProfilePopup'
import FiltersPopup from '../../components/FiltersPopup'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import { useNavigation } from '@react-navigation/native'
import MatchService, { GetAllSet, Match } from '../../services/matchService'


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [isFilterPopupVisible, setFilterPopupVisible] = useState(false)
  const onOpen = () => setPopupVisible(true)
  const onClose = () => setPopupVisible(false)

  const [data, setData] = useState<Match<GetAllSet>[]>([])
  const [isLoading, setLoading] = useState(true)

  const fetchMatches = () => {
    setLoading(true)
    const getMatches = async () => {
      const res = await MatchService.getAll()
      setData(res.data)
    }

    getMatches().finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMatches()
    })

    return unsubscribe
  }, [navigation])

  return (
    <HomeContainer>
      <GestureHandlerRootView>
        <StatusBar style="dark" />
        <ScrollView bounces={false}>
          <HomeHeader onOpen={onOpen} />
          <MatchList setFiltersVisible={setFilterPopupVisible} data={data} isLoading={isLoading} />
        </ScrollView>
        <BottomContainer>
          <ButtonComponent title="New match" size="M" onPress={() => navigation.navigate('StartMatch')} />
        </BottomContainer>
        <ProfilePopup visible={isPopupVisible} onClose={onClose} />
        <FiltersPopup visible={isFilterPopupVisible} onClose={() => setFilterPopupVisible(false)} />
      </GestureHandlerRootView>
    </HomeContainer>
  )
}

export default HomeScreen
