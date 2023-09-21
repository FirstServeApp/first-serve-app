import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import MatchStatsScreen from '../screens/MatchStatsScreen'
import IconBtn from '../components/UI/Button/IconBtn'
import { TextS } from '../styles/typography'
import { useNavigation } from '@react-navigation/native'
import { getShareText } from '../utils/matchUtils'
import { Share } from 'react-native'
import { Match, Set } from '../services/matchService'
import StartMatchScreen from '../screens/StartMatchScreen'
import COLORS from '../styles/colors'
import PlayerDetailsScreen from '../screens/PlayerDetailsScreen'
import { Icon } from '../components/UI/Icon'
import { PlayerDetailsHeaderTitleContainer, HeaderIconsWrap } from './styles'
import ChooseFromContactsScreen from '../screens/ChooseFromContactsScreen'
import HeaderPlayerTitle from '../components/HeaderPlayerTitle'
import PlayersFilterScreen from '../screens/PlayersFilterScreen'
import Link from '../components/UI/Link'
import { useFilters } from '../context/FiltersContext'
import MatchScreen from '../screens/MatchScreen'
import WinnerScreen from '../screens/WinnerScreen'
import EditMatchScreen from '../screens/EditMatchScreen'
import { PopupNames, usePopup } from '../context/PopupContext'

export type AuthenticatedStackParams = {
  Home: undefined;
  EditMatch: { id: string, opponentName?: string };
  MatchStats: { matchId: string, matchData?: Match<Set>, userName?: string };
  StartMatch: undefined;
  PlayerDetails: undefined;
  ChooseFromContacts: { player: 'me' | 'opponent' };
  PlayersFilter: undefined;
  Match: undefined;
  Winner: { data: Match<Set> };
}

export type AuthenticatedNavigationProps = NativeStackNavigationProp<AuthenticatedStackParams>

const AuthenticatedStack = createNativeStackNavigator<AuthenticatedStackParams>()

const AuthenticatedNavigation = () => {
  const navigation = useNavigation<AuthenticatedNavigationProps>()
  const { setPlayersFilter, playersFilter } = useFilters()
  const { showPopup } = usePopup()

  const onShare = async (matchData?: Match<Set>, userName?: string) => {
    if (matchData && userName) {
      await Share.share({
        message: getShareText(matchData, userName),
        title: '🎾 Match Result 🎾',
      })
    }
  }

  return (
    <AuthenticatedStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
        headerStyle: { backgroundColor: COLORS.lightGray },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerLeft: () => <IconBtn icon="arrow-left" onPress={() => navigation.goBack()} />,
      }}
    >
      <AuthenticatedStack.Screen
        name="Home"
        component={HomeScreen}
      />
      <AuthenticatedStack.Screen
        name="EditMatch"
        options={{
          animation: 'fade',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => <TextS>Edit match</TextS>,
          headerRight: () => <IconBtn icon="trash" onPress={() => showPopup(PopupNames.DeleteMatch)} />,
        }}
        component={EditMatchScreen}
      />
      <AuthenticatedStack.Screen
        name="MatchStats"
        options={({ route }) => ({
          animation: 'fade',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => <TextS>Match statistics</TextS>,
          headerRight: () => (<HeaderIconsWrap>
            <IconBtn
              icon="edit"
              onPress={() => navigation.navigate('EditMatch', {
                id: route.params.matchId,
                opponentName: route.params.matchData?.opponentName,
              })}
            />
            <IconBtn icon="share" onPress={() => onShare(route.params.matchData, route.params.userName)} />
          </HeaderIconsWrap>),
        })}
        component={MatchStatsScreen}
      />
      <AuthenticatedStack.Screen
        name="StartMatch"
        options={{
          headerShown: true,
          animation: 'fade',
          headerTitle: () => <TextS>Match settings</TextS>,
        }}
        component={StartMatchScreen}
      />
      <AuthenticatedStack.Screen
        name="Match"
        options={{
          animation: 'fade_from_bottom',
        }}
        component={MatchScreen}
      />
      <AuthenticatedStack.Screen
        name="Winner"
        options={{
          headerShown: true,
          animation: 'fade',
          headerTitle: () => <TextS>Match tracking</TextS>,
          headerLeft: () => null,
        }}
        component={WinnerScreen}
      />
      <AuthenticatedStack.Screen
        name="PlayerDetails"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: () => (<PlayerDetailsHeaderTitleContainer>
            <Icon name="fill" color={COLORS.red} />
            <TextS>Opponent</TextS>
          </PlayerDetailsHeaderTitleContainer>),
        }}
        component={PlayerDetailsScreen}
      />
      <AuthenticatedStack.Screen
        name="ChooseFromContacts"
        options={({ route }) => ({
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: () => <HeaderPlayerTitle player={route.params.player} />,
        })}
        component={ChooseFromContactsScreen}
      />
      <AuthenticatedStack.Screen
        name="PlayersFilter"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: () => <TextS>Filter by player</TextS>,
          headerRight: () => playersFilter.length > 0 && (
            <Link onPress={() => setPlayersFilter([])} color={COLORS.red}>Reset</Link>
          ),
        }}
        component={PlayersFilterScreen}
      />
    </AuthenticatedStack.Navigator>
  )
}

export default AuthenticatedNavigation
