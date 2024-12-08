import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import { makeError404Page } from '@/main/factories/pages/404.page.factory'
import { makeCharacterPage } from '@/main/factories/pages/character.page.factory'
import { makeWelomeHomePage } from '@/main/factories/pages/home.page.factory'
import { PageLayout } from '@/presenter/components/PageLayout/PageLayout'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { makeFilmPage } from '../factories/pages/film.page.factory'

const makeRootRoute: RouteObject = {
  path: '/',
  element: <PageLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTER_PATHS.WELCOME} />
    },
    makeCharacterPage,
    makeFilmPage,
    makeWelomeHomePage,
    makeError404Page
  ]
}

export const router = createBrowserRouter([makeRootRoute])
