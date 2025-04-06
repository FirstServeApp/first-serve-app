/* eslint-disable react-native/no-inline-styles */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { HomeContainer, BottomContainer } from './styles'
import HomeHeader from '../../components/HomeHeader'
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ListRenderItemInfo,
  Animated,
  ActivityIndicator,
} from 'react-native'
import ButtonComponent from '../../components/UI/Button'
import { AuthenticatedNavigationProps } from '../../navigation/AuthenticatedNavigation'
import { useNavigation } from '@react-navigation/native'
import MatchService, { CreateMatchSet, GetAllSet, Match } from '../../services/matchService'
import { PopupNames, usePopup } from '../../context/PopupContext'
import { useFilters } from '../../context/FiltersContext'
import { watchEvents, sendMessage } from 'react-native-watch-connectivity'
import matchService from '../../services/matchService'
import { Buffer } from 'buffer'
import { StoreKeys, setItemInStore } from '../../utils/secureStoreUtils'
import MatchCard from '../../components/MatchList/MatchCard'
import {
  FilterBlock,
  NoMatchesContainer,
  NoMatchesIllustrationWrap,
  NoMatchesSubtitle,
} from '../../components/MatchList/styles'
import { Illustration } from '../../components/UI/Illustration'
import { Header3 } from '../../styles/typography'
import { getMatchCount, getAllMatchesQueries } from '../../utils/matchUtils'
import { FilterIconButton } from '../../components/UI/Button/FilterIconButton'
import COLORS from '../../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PausedMatch, useMatch } from '../../context/MatchContext'
import PausedMatchCard from '../../components/MatchList/PausedMatchCard'
import { useAuth } from '../../context/AuthContext'


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  empty: {
    flexGrow: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 24,
    gap: 16,
    paddingHorizontal: 16,
  },
})

type WatchMatchData = {
  winner: string;
  opponentName: string;
  sets: [CreateMatchSet];
  duration: number;
  matchUniqueId: any;
}

const matchUniqueIds: string[] = []
const FILTER_BLOCK_HEIGHT = 56
const HEADER_HEIGHT = 64
const CARD_HEIGHT = 168

const MemoizedMatchCard = memo(
  MatchCard,
  (prev, next) => (prev.data._id === next.data._id) && (prev.data.opponentName === next.data.opponentName),
)

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { showPopup } = usePopup()
  const { dateFilter, playersFilter,
    otherPeriodStartDate, otherPeriodEndDate, isFiltersApplied } = useFilters()
  const { user } = useAuth()
  const { storage, pausedMatchId } = useMatch()
  const { top } = useSafeAreaInsets()

  const [data, setData] = useState<Match<GetAllSet>[]>([])
  const [matchesCount, setMatchesCount] = useState<number>(0)
  const [pausedMatches, setPausedMatches] = useState<PausedMatch[]>([])

  const [isLoading, setLoading] = useState(true)
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const [currentPage, setCurrentPage] = useState(2)
  const [fetching, setFetching] = useState(false)

  const triggerRefresh = () => setShouldRefresh(prev => !prev)

  const initFetchMatches = async () => {
    const queries = getAllMatchesQueries(dateFilter, otherPeriodStartDate, otherPeriodEndDate, playersFilter)
    const res = await MatchService.getLimited(queries, 1)
    return res.data
  }

  const loadMore = () => {
    if (isLoading || fetching || matchesCount === data.length) {
      return
    }
    setFetching(true)
    const loadNextPage = async () => {
      const queries = getAllMatchesQueries(dateFilter, otherPeriodStartDate, otherPeriodEndDate, playersFilter)
      const res = await MatchService.getLimited(queries, currentPage)
      if (res.data.matches.length === 0) {
        return
      }
      setData(prev => [...new Set([...prev, ...res.data.matches])])
    }
    loadNextPage()
      .then(() => setCurrentPage(prev => prev+1))
      .finally(() => setFetching(false))
  }

  const loadPausedMatches = async () => {
    const pausedMatches = await storage.getAllDataForKey('pausedMatches')
    setPausedMatches(pausedMatches)
  }

  const refresh = () => {
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    sendMessage({ type: 'trigger' }, x => console.log(x), y => console.log('error sendMessage: ', y))
    const getMatches = async () => {
      const { matches, count } = await initFetchMatches()
      setData(matches)
      setMatchesCount(count)
    }
    Promise.all([
      getMatches(),
      loadPausedMatches(),
    ]).finally(() => setLoading(false))
  }

  const unsubscribe = watchEvents.on<{ watchMessage: string }>('message', payload => {
    // const message = Buffer.from(String(payload.watchMessage), 'base64').toString('utf-8')
    // const data = JSON.parse(message) as WatchMatchData
    // if (data && !matchUniqueIds.includes(data.matchUniqueId)) {
    //   matchService
    //     .create(data.winner === 'opponent', data.opponentName, data.sets, data.duration)
    //     .then(() => triggerRefresh())
    //   // eslint-disable-next-line @typescript-eslint/no-empty-function
    //   sendMessage({ type: 'removeMatchId', matchId: String(data.matchUniqueId) }, () => {}, () => {})
    //   matchUniqueIds.push(data.matchUniqueId)
    // }
    // console.log(data.winner)
  })
  const watchUserInfoListener = watchEvents.on<{ watchMessage: string }>('user-info', userInfo => {
    userInfo.map(msg => {
      const message = Buffer.from(String(msg.watchMessage), 'base64').toString('utf-8')
      const data = JSON.parse(message) as WatchMatchData
      if (data && !matchUniqueIds.includes(data.matchUniqueId)) {
        console.log(data.matchUniqueId, ': in conditional scope')
        matchService
          .create(data.winner === 'opponent', data.opponentName, data.sets, data.duration)
          .then(() => triggerRefresh())
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        sendMessage({ type: 'removeMatchId', matchId: String(data.matchUniqueId) }, () => {}, () => {})
        matchUniqueIds.push(data.matchUniqueId)
      }
    })
  })

  useEffect(() => {
    setCurrentPage(2)
    const setLastOpenedTime = async () => {
      await setItemInStore(StoreKeys.lastOpenedTime, new Date().toISOString())
    }
    setLastOpenedTime()
    return () => {
      watchUserInfoListener()
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setCurrentPage(2)
    const fetchMatches = async () => {
      const { matches, count } = await initFetchMatches()
      setData(matches)
      setMatchesCount(count)
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    sendMessage({ type: 'trigger' }, () => {}, () => {})
    Promise.all([
      fetchMatches(),
      loadPausedMatches(),
    ]).finally(() => setLoading(false))
    const unsubscribe = navigation.addListener('focus', () => {
      setFetching(false)
      setLoading(false)
      setCurrentPage(2)
      fetchMatches()
    })
    return unsubscribe
  }, [shouldRefresh, dateFilter, playersFilter, pausedMatchId, navigation])

  const showEmptyStyles = (data.length === 0 || !data) && !isLoading && pausedMatches.length > 1

  const renderItem = useCallback((info: ListRenderItemInfo<Match<GetAllSet> & {userName?: string}>) => {
    return <MemoizedMatchCard data={info.item} userName={info.item.userName} />
  }, [])

  const HeaderComponent = memo(({ paused }: { paused: PausedMatch[]}) => (
    <>
      {paused.map(pausedMatch => (
        <PausedMatchCard data={pausedMatch} key={pausedMatch.id} />
      ))}
    </>
  ))

  const listEmptyComponent = () => (
    <View onStartShouldSetResponder={() => true} style={isFiltersApplied ? {flexGrow: 0} : styles.empty}>
      <NoMatchesContainer>
        <NoMatchesIllustrationWrap>
          <Illustration name="no-matches" />
        </NoMatchesIllustrationWrap>
        <NoMatchesSubtitle>
          {'Here will be the history\nof your matches'}
        </NoMatchesSubtitle>
      </NoMatchesContainer>
    </View>
  )

  const scrollY = new Animated.Value(0)
  const animOffset = FILTER_BLOCK_HEIGHT + HEADER_HEIGHT
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
    extrapolateLeft: 'clamp',
  })

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <HomeContainer>
        <StatusBar style="dark" />
        <FlatList
          onScroll={e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y + e.nativeEvent.contentInset.top)
          }}
          data={data}
          scrollEnabled
          extraData={[pausedMatches, pausedMatchId, shouldRefresh]}
          style={styles.flex}
          contentContainerStyle={[styles.container, showEmptyStyles && styles.empty]}
          ListHeaderComponentStyle={{ marginTop: 16, gap: 16, overflow: 'scroll' }}
          scrollEventThrottle={14}
          contentInset={{ top: animOffset + top, bottom: 80 }}
          scrollIndicatorInsets={{ top: 80, right: -2 }}
          initialNumToRender={5}
          windowSize={13}
          maxToRenderPerBatch={15}
          getItemLayout={(_, index) => ({ length: CARD_HEIGHT, offset: (CARD_HEIGHT + 8) * index, index })}
          keyExtractor={item => item._id}
          removeClippedSubviews
          onEndReached={loadMore}
          onEndReachedThreshold={1.4}
          refreshing={isLoading}
          onRefresh={refresh}
          ListHeaderComponent={() => <HeaderComponent paused={pausedMatches} />}
          renderItem={function(info: ListRenderItemInfo<Match<GetAllSet> & {userName?: string}>) {
            info.item.userName = user?.name
            return renderItem(info)
          }}
          ListEmptyComponent={() => (pausedMatches.length > 0 && !isFiltersApplied) ? null : listEmptyComponent()}
          ListFooterComponent={(!fetching || (data.length === matchesCount)) ? null : (
            <View style={{ width: '100%', paddingVertical: 64, justifyContent: 'flex-start' }}>
              <ActivityIndicator color={COLORS.black} size="small" />
            </View>
          )}
        />
        <Animated.View
          style={{
            transform: [{translateY: clampedScrollY}],
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}>
          <>
            <HomeHeader onOpen={() => showPopup(PopupNames.Profile)} />
            <FilterBlock>
              <Header3>{getMatchCount(matchesCount)}</Header3>
              <FilterIconButton isFilterApplied={isFiltersApplied} onPress={() => showPopup(PopupNames.Filters)} />
            </FilterBlock>
          </>
        </Animated.View>
        <BottomContainer>
          <ButtonComponent title="New match" size="M" onPress={() => navigation.navigate('StartMatch')} />
        </BottomContainer>
      </HomeContainer>
    </TouchableWithoutFeedback>
  )
}

export default HomeScreen
