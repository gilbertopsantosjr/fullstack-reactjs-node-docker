import { SearchResult } from '@/domain/searchResult'
import { AxiosResponse } from 'axios'

export interface GetSearchType {
  handle: () => Promise<AxiosResponse<SearchResult[]>>
}
