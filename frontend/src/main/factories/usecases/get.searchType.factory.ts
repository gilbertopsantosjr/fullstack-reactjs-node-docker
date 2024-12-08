import { RemoteGetSearchType } from '@/data/usecases/remote.get.searchtype'
import { getEnv } from '@/infra/utils/get.env'

export const makeGetSearchType = (type: string, inputQuery?: string) => {
  let url = `${getEnv()}/search/${type}`
  if (inputQuery) {
    url = `${url}?input=${inputQuery}`
  }

  return new RemoteGetSearchType(url)
}
