import { AxiosRequestConfig } from 'axios'
import { $api } from '../http'


export type GameHistory = {
  myScore: number;
  opponentScore: number;
  serve: number;
  type: string;
  server: string;
}

export type Game = {
  index: number;
  duration: number;
  myScore: number;
  opponentScore: number;
  server: string;
  history: GameHistory[];
}

export type GetAllSet = {
  index: number;
  myScore: number;
  opponentScore: number;
}

export type Set = {
  _id: string;
  index: number;
  myScore: number;
  opponentScore: number;
  games: Game[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type Match<T> = {
  _id: string;
  user_id: string;
  winner: string;
  opponentName: string;
  sets: T[];
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type CreateMatchSet = {
  index: number;
  myScore: number;
  opponentScore: number;
  games: Game[];
}

export type MatchData<T> = {
  winner: string;
  opponentName: string;
  sets: T[];
  duration: number;
}

type GetAllRes = {
  data: Match<GetAllSet>[];
}

type GetByIdRes = {
  data: Match<Set>;
}

type CreateMatchRes = {
  data: Match<Set>;
}

type StatItem = {
  all: { me: { total: number, count: number }, opponent: { total: number, count: number } },
  bySet: { me: { total: number, count: number }, opponent: { total: number, count: number } }[],
}

export type MatchDetails = {
  aces: StatItem;
  doubleFaults: StatItem;
  winners: StatItem;
  forcedErrors: StatItem;
  unforcedErrors: StatItem;
  totalWon: StatItem;
  totalServiceWon: StatItem;
  totalReturnWon: StatItem;
  firstServes: StatItem;
  secondServes: StatItem;
  firstServePointsWon: StatItem;
  secondServePointsWon: StatItem;
  breakPointsWon: StatItem;
  aggressiveMargin: StatItem;
}

type GetMatchDetails = {
  data: MatchDetails;
}

class MatchService {
  async getAll() {
    return await $api.get<AxiosRequestConfig, GetAllRes>('/match/all')
  }

  async getById(id: string) {
    return await $api.get<AxiosRequestConfig, GetByIdRes>(`/match/${id}`)
  }

  async create(isOpponentWins: boolean, opponentName: string, sets: CreateMatchSet[], duration: number) {
    return await $api.post<AxiosRequestConfig, CreateMatchRes>('match/create', {
      winner: isOpponentWins ? 'opponent' : 'me',
      opponentName,
      setsArr: sets,
      duration,
    })
  }

  async getDetails(id: string) {
    return await $api.get<AxiosRequestConfig, GetMatchDetails>(`/match/details/${id}`)
  }

  async changeOpponentName(opponentName: string, id: string) {
    return await $api.patch<AxiosRequestConfig, CreateMatchRes>(`/match/change/${id}`, { opponentName })
  }

  async deleteMatch(id: string) {
    return await $api.delete(`/match/${id}`)
  }
}

export default new MatchService()
