import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import ErrorBoundary from '@/presenter/components/ErrorBoundary/ErrorBoundary'
import { FilmPage } from '@/presenter/pages/Film/Film'
import { RouteObject } from 'react-router-dom'
import { makeGetFilm } from '../usecases/get.film.factory'

export const makeFilmPage: RouteObject = {
  path: ROUTER_PATHS.FILMS,
  element: <FilmPage />,
  loader: async ({ params }) => {
    const { id } = params
    const response = await makeGetFilm(id!).handle()
    return response.data
  },
  errorElement: <ErrorBoundary />
}
