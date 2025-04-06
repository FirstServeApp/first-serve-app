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
  data: {
    matches: Match<GetAllSet>[],
    count: number,
  };
}

type GetByIdRes = {
  data: Match<Set>;
}

type GetOpponentsRes = {
  data: string[];
}

type CreateMatchRes = {
  data: Match<Set>;
}

type StatItem = {
  all: { me: { total: number, count: number }, opponent: { total: number, count: number } },
  bySet: { me: { total: number, count: number }, opponent: { total: number, count: number } }[],
}

export interface MatchDetails {
  firstServes: StatItem;
  firstServePointsWon: StatItem;
  secondServes: StatItem;
  secondServePointsWon: StatItem;
  aces: StatItem;
  doubleFaults: StatItem;
  winners: StatItem;
  forcedErrors: StatItem;
  unforcedErrors: StatItem;
  totalWon: StatItem;
  totalServiceWon: StatItem;
  totalReturnWon: StatItem;
  breakPointsWon: StatItem;
  aggressiveMargin: StatItem;
}

export class MatchDetailsDTO implements MatchDetails {
  firstServes: StatItem
  firstServePointsWon: StatItem
  secondServes: StatItem
  secondServePointsWon: StatItem
  aces: StatItem
  doubleFaults: StatItem
  winners: StatItem
  forcedErrors: StatItem
  unforcedErrors: StatItem
  totalWon: StatItem
  totalServiceWon: StatItem
  totalReturnWon: StatItem
  breakPointsWon: StatItem
  aggressiveMargin: StatItem

  constructor (data: MatchDetails) {
    this.firstServes = data.firstServes,
    this.firstServePointsWon = data.firstServePointsWon,
    this.secondServes = data.secondServes,
    this.secondServePointsWon = data.secondServePointsWon,
    this.aces = data.aces,
    this.doubleFaults = data.doubleFaults,
    this.winners = data.winners,
    this.forcedErrors = data.forcedErrors,
    this.unforcedErrors = data.unforcedErrors,
    this.totalWon = data.totalWon,
    this.totalServiceWon = data.totalServiceWon,
    this.totalReturnWon = data.totalReturnWon,
    this.breakPointsWon = data.breakPointsWon,
    this.aggressiveMargin = data.aggressiveMargin
  }
}

type GetMatchDetails = {
  data: MatchDetails;
}

class MatchService {
  async getAll() {
    return await $api.get<AxiosRequestConfig, GetAllRes>('/match/all?page=1&pageSize=50')
  }

  async getLimited(queries?: string, page?: number): Promise<GetAllRes> {
    const url = `/match/all?page=${page || 1}&pageSize=10${queries ? queries : ''}`
    return await $api.get<AxiosRequestConfig, GetAllRes>(url)
  }

  async getAllOpponents(): Promise<GetOpponentsRes> {
    return await $api.get<AxiosRequestConfig, {data: string[]}>('/match/all/players')
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
