import React, { useEffect, useState } from 'react'
import {
  Container,
  CardBlockContainer,
  StatsBlockContainer,
  styles,
} from './styles'
import { ScrollView, View } from 'react-native'
import MatchCard from '../../components/MatchList/MatchCard'
import ToggleGroup, { ToggleBtnsNames } from '../../components/ToggleGroup'
import MatchStats from '../../components/MatchStats'
import MatchHistory from '../../components/MatchHistory'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthenticatedNavigationProps, AuthenticatedStackParams } from '../../navigation/AuthenticatedNavigation'
import MatchService, { Match, Set, MatchDetails } from '../../services/matchService'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'
import Loader from '../../components/UI/Loader'

type Props = NativeStackScreenProps<AuthenticatedStackParams, 'MatchStats'>

export let handleShare: () => void

const MatchStatsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [selectedButton, setSelectedButton] = useState<ToggleBtnsNames>(ToggleBtnsNames.Stats)
  const [data, setData] = useState<Match<Set>>()
  const [stat, setStat] = useState<MatchDetails>()
  const { user } = useAuth()

  useEffect(() => {
    const getMatches = async () => {
      const res = await MatchService.getById(route.params.matchId)
      const statistics = await MatchService.getDetails(route.params.matchId)
      setData(res.data)
      setStat(statistics.data)
      navigation.setParams({ matchData: res.data, userName: user?.name })
    }

    getMatches()
  }, [])

  if (!data || !stat) {
    return <Loader />
  }

  return (
    <ScrollView style={styles.scrollView} bounces={false}>
      <Container>
        <View>
          <CardBlockContainer>
            <MatchCard data={data} showTime />
          </CardBlockContainer>
        </View>
        <StatsBlockContainer>
          <ToggleGroup selectedBtn={selectedButton} setSelectedBtn={setSelectedButton} />
          {selectedButton === ToggleBtnsNames.Stats ? (
            <MatchStats data={stat} />
          ) : (
            <MatchHistory data={data} />
          )}
        </StatsBlockContainer>
      </Container>
    </ScrollView>
  )
}

export default MatchStatsScreen
