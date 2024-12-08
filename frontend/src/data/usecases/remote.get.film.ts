import { Film } from '@/domain/film'
import axios, { AxiosResponse } from 'axios'
import { GetFilm } from '../protocols/get.film'

export class RemoteGetFilm implements GetFilm {
  constructor(private readonly url: string) {}

  async handle(): Promise<AxiosResponse<Film>> {
    console.log(`Fetching film from ${this.url}`)

    return axios.get(`${this.url}`)
  }
}
