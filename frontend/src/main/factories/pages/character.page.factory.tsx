import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import ErrorBoundary from '@/presenter/components/ErrorBoundary/ErrorBoundary'
import { CharacterPage } from '@/presenter/pages/Character/Character'
import { RouteObject } from 'react-router-dom'
import { makeGetCharacter } from '../usecases/get.character.factory'

export const makeCharacterPage: RouteObject = {
  path: ROUTER_PATHS.PEOPLE,
  element: <CharacterPage />,
  loader: async ({ params }) => {
    const { id } = params
    const response = await makeGetCharacter(id!).handle()
    return response.data
  },
  errorElement: <ErrorBoundary />
}
