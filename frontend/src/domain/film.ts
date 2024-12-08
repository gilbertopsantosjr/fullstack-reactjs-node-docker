import { Character } from './character'

export type Film = {
  name: string
  episode_id: string
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  url: string
  characters: Character[]
}
