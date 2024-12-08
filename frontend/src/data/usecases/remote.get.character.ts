import { Character } from '@/domain/character'
import axios, { AxiosResponse } from 'axios'
import { GetCharacter } from '../protocols/get.character'

export class RemoteGetCharacter implements GetCharacter {
  constructor(private readonly url: string) {}

  async handle(): Promise<AxiosResponse<Character>> {
    console.log(`Fetching Character from ${this.url}`)

    return axios.get(`${this.url}`)
  }
}
