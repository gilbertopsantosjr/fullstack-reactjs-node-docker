import { Film } from '@/domain/film'
import { AxiosResponse } from 'axios'

export interface GetFilm {
  handle: () => Promise<AxiosResponse<Film>>
}
