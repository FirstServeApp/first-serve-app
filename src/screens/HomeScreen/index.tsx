import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { HomeContainer, BottomContainer } from './styles'
import HomeHeader from '../../components/HomeHeader'
import { MatchList } from '../../components/MatchList'
import { ScrollView, StyleSheet } from 'react-native'
import ButtonComponent from '../../components/UI/Button'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import { useNavigation } from '@react-navigation/native'
import MatchService, { GetAllSet, Match } from '../../services/matchService'
import { PopupNames, usePopup } from '../../context/PopupContext'


const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
  },
})


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { showPopup } = usePopup()

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

  const showEmptyStyles = data.length === 0 || !data || isLoading

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
        <ScrollView bounces={false} style={styles.flex} contentContainerStyle={showEmptyStyles && styles.empty}>
          <HomeHeader onOpen={() => showPopup(PopupNames.Profile)} />
          <MatchList data={data} isLoading={isLoading} />
        </ScrollView>
        <BottomContainer>
          <ButtonComponent title="New match" size="M" onPress={() => navigation.navigate('StartMatch')} />
        </BottomContainer>
      </GestureHandlerRootView>
    </HomeContainer>
  )
}

export default HomeScreen
