import { DateFilterNames } from '../context/FiltersContext'
import { GetAllSet, Match, Set } from '../services/matchService'

export const getMatchDate = (createdAt: Date) => {
  const date = new Date(createdAt)

  return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${date.getFullYear()}`
}

export const getMatchCount = (count: number) => {
  const matchWord = count === 1 ? 'match' : 'matches'

  return `${count} ${matchWord}`
}

export const calculateMatchDuration = (start: Date, end: Date) => {
  const startMs = start.getTime()
  const endMs = end.getTime()
  return Math.abs(endMs - startMs) / 1000
}

export const getMatchDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor(duration % 3600 / 60)
  const seconds = Math.floor(duration % 60)

  let formattedDuration = ''

  if (hours > 0) {
    formattedDuration += ` ${hours}h`
  }

  if (minutes > 0) {
    formattedDuration += ` ${minutes}m`
  }

  if (seconds > 0) {
    formattedDuration += ` ${seconds}s`
  }

  return formattedDuration.trim()
}

export const getShareText = (data: Match<Set>, userName: string) => {
  const set1 = `Set 1: ${userName} ${data.sets[0].myScore} - ${data.sets[0].opponentScore} ${data.opponentName}\n`
  const set2 = `Set 2: ${userName} ${data.sets[1]?.myScore} - ${data.sets[1]?.opponentScore} ${data.opponentName}\n`
  const set3 = `Set 3: ${userName} ${data.sets[2]?.myScore} - ${data.sets[2]?.opponentScore} ${data.opponentName}`
  return `🎾 Match Result 🎾

🏆 Winner: ${data.winner === 'me' ? userName : data.opponentName}
🤼‍♂️ Players: ${userName} vs. ${data.opponentName}
⏱️ Match Duration: ${getMatchDuration(data.duration)}
🗓️ Date: ${getMatchDate(data.createdAt)}
🎯 Set Results:
${data.sets.length > 0 ? set1 : ''}${data.sets.length > 1 ? set2 : ''}${data.sets.length > 2 ? set3 : ''}
📊 FirstServe: Record. Analyze. Improve.
🎾 Want to keep track of your matches and improve your game? Try FirstServe!
Our app allows you to record match results, track statistics, and analyze your
performance. Download now and take your tennis game to the next level!
📲 Learn more: https://firstserve.app
#FirstServe #Tennis #MatchResult #RecordAndAnalyze`
}

export type GroupedPlayers = {
  [key: string]: string[];
}

export const groupPlayersByLetter = (players: string[]) => {
  const groupedData: GroupedPlayers = {}

  players.forEach(player => {
    const firstLetter = player.charAt(0).toUpperCase()
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = []
    }
    groupedData[firstLetter].push(player)
  })

  return groupedData
}

export const getValidScoreValue = (data: Match<GetAllSet | Set>) => {
  const myScores: string[] = []
  const opponentScores: string[] = []

  data.sets.map((set, index) => {
    if (data.sets[index].opponentScore || data.sets[index].myScore) {
      myScores.push(set.myScore.toString())
      opponentScores.push(set.opponentScore.toString())
      return
    }

    myScores.push('·')
    opponentScores.push('·')
  })

  return { myScores, opponentScores }
}

export const filterMatchesByDate = (
  data: Match<GetAllSet>[],
  dateFilter: DateFilterNames,
  otherPeriodStartDate?: Date,
  otherPeriodEndDate?: Date,
): Match<GetAllSet>[] => {
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
  })

  return filteredData
}

export const getDateQueries = (
  dateFilter: DateFilterNames,
  otherPeriodStartDate?: Date,
  otherPeriodEndDate?: Date,
): string => {
  const currentDate = new Date()
  switch (dateFilter) {
    case DateFilterNames.All:
      return ''
    case DateFilterNames.Day:
      const twentyFourHoursAgo = new Date()
      twentyFourHoursAgo.setDate(currentDate.getDate() - 1)
      return `&from=${twentyFourHoursAgo.toISOString()}&to=${currentDate.toISOString()}`
    case DateFilterNames.Week:
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(currentDate.getDate() - 7)
      return `&from=${sevenDaysAgo.toISOString()}&to=${currentDate.toISOString()}`
    case DateFilterNames.Month:
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(currentDate.getMonth() - 1)
      return `&from=${oneMonthAgo.toISOString()}&to=${currentDate.toISOString()}`
    case DateFilterNames.Other:
      if (otherPeriodStartDate && otherPeriodEndDate) {
        const start = new Date(otherPeriodStartDate)
        const end = new Date(otherPeriodEndDate)
        return `&from=${start.toISOString()}&to=${end.toISOString()}`
      }
      return ''
    default:
      return ''
  }
}

export const getPlayersQueries = (players: string[]): string => {
  if (players.length === 0) {
    return ''
  }
  return `&players=${encodeURIComponent(JSON.stringify(players))}`
}

export const getAllMatchesQueries = (
  dateFilter?: DateFilterNames,
  otherPeriodStartDate?: Date,
  otherPeriodEndDate?: Date,
  players?: string[],
): string => {
  const query: string[] = ['', '']
  if (dateFilter) {
    query[0] = getDateQueries(dateFilter, otherPeriodStartDate, otherPeriodEndDate)
  }
  if (players) {
    query[1] = getPlayersQueries(players)
  }
  return query.join('')
}

export const filterMatchesByPlayer = (data: Match<GetAllSet>[], playersFilter: string[]): Match<GetAllSet>[] => {
  const filteredData = data.filter(match => {
    if (playersFilter.length === 0) {
      return true
    }

    return playersFilter.includes(match.opponentName)
  })

  return filteredData
}
