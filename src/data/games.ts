import gamesJson from './games.json'

export type GameType = '2D' | '3D' | 'HTML5'

export type GameItem = {
  code: string
  name: string
  category: string
  type: GameType
  rating: number
  coverImage?: string
}

export const games = gamesJson as GameItem[]

export function getGameByCode(code: string) {
  return games.find((game) => game.code === code) ?? games[0]
}
