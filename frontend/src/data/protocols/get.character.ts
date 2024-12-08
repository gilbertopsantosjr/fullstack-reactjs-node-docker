import { Character } from '@/domain/character'
import { AxiosResponse } from 'axios'

export interface GetCharacter {
  handle: () => Promise<AxiosResponse<Character>>
}
