import storiesJson from './stories.json'

export type StoryType = 'Playable' | 'Story'

export type StoryItem = {
  code: string
  title: string
  category: string
  type: StoryType
  rating: number
  coverImage?: string
  gameCode?: string
}

export const stories = storiesJson as StoryItem[]
