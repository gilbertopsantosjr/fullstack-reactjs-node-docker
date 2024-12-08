import { SearchResult } from '@/domain/searchResult'
import axios, { AxiosResponse } from 'axios'
import { GetSearchType } from '../protocols/get.searchType'

export class RemoteGetSearchType implements GetSearchType {
  constructor(private readonly url: string) {}

  async handle(): Promise<AxiosResponse<SearchResult[]>> {
    console.log(`Fetching from ${this.url}`)

    return axios.get(`${this.url}`)
  }
}
