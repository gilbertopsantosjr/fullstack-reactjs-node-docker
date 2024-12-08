import { RemoteGetCharacter } from '@/data/usecases/remote.get.character'
import { getEnv } from '@/infra/utils/get.env'

export const makeGetCharacter = (id: string) => {
  const url = `${getEnv()}/character/${id}`

  return new RemoteGetCharacter(url)
}
