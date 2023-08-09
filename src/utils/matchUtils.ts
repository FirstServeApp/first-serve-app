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
  return `
  🎾 Match Result 🎾

  🏆 Winner: ${data.winner === 'me' ? userName : data.opponentName}

  🤼‍♂️ Players:
  ${userName} vs. ${data.opponentName}

  🎯 Set Results:
  Set 1: ${userName} ${data.sets[0].myScore} - ${data.sets[0].opponentScore} ${data.opponentName}
  Set 2: ${userName} ${data.sets[1]?.myScore || '·'} - ${data.sets[1]?.opponentScore || '·'} ${data.opponentName}
  Set 3: ${userName} ${data.sets[2]?.myScore || '·'} - ${data.sets[2]?.opponentScore || '·'} ${data.opponentName}

  ⏱️ Match Duration: ${getMatchDuration(data.duration)}

  🗓️ Date: ${getMatchDate(data.createdAt)}

  📊 FirstServe: Record. Analyze. Improve.

  🎾 Want to keep track of your matches and improve your game? Try FirstServe!
  Our app allows you to record match results, track statistics, and analyze your
  performance. Download now and take your tennis game to the next level!

  📲 Learn more: https://firstserve.app

  #FirstServe #Tennis #MatchResult #RecordAndAnalyze
  `
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
