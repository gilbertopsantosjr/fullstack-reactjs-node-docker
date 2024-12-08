import { RemoteGetFilm } from '@/data/usecases/remote.get.film'
import { getEnv } from '@/infra/utils/get.env'

export const makeGetFilm = (id: string) => {
  const url = `${getEnv()}/films/${id}`

  return new RemoteGetFilm(url)
}
