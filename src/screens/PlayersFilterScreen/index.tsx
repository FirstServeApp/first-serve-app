import React, { useCallback, useEffect, useState } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { Container, ChooseFromContactsHeader, ButtonContainer } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import SearchBar from '../../components/UI/Input/SearchBar'
import MatchService from '../../services/matchService'
import { GroupedPlayers, groupPlayersByLetter } from '../../utils/matchUtils'
import PlayersList from './PlayersList'
import Loader from '../../components/UI/Loader'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'


const PlayersFilterScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const [data, setData] = useState<GroupedPlayers>({})
  const [loading, setLoading] = useState(true)
  const [filteredList, setFilteredList] = useState(data)

  const filterBySearch = useCallback((query: string) => {
    const filteredData: GroupedPlayers = {}
    Object.keys(data).forEach(key => {
      const filteredPlayers = data[key].filter(player => {
        return player.toLowerCase().includes(query.toLowerCase())
      })
      if (filteredPlayers.length > 0) {
        filteredData[key] = filteredPlayers
      }
    })

    setFilteredList(filteredData)
  }, [data])

  useEffect(() => {
    const getMatches = async () => {
      const res = await MatchService.getAllOpponents()
      const groupedData = groupPlayersByLetter(res.data.sort())
      setFilteredList(groupedData)
      setData(groupedData)
    }

    getMatches().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <ChooseFromContactsHeader>
          <SearchBar onChange={filterBySearch} />
        </ChooseFromContactsHeader>
        <Container>
          <PlayersList data={filteredList} />
          <ButtonContainer>
            <ButtonComponent title="Save" size="M" onPress={() => navigation.navigate('Home')} />
          </ButtonContainer>
        </Container>
      </>
    </TouchableWithoutFeedback>
  )
})

export default PlayersFilterScreen
