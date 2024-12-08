import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import ErrorBoundary from '@/presenter/components/ErrorBoundary/ErrorBoundary'
import { HomePage } from '@/presenter/pages/Home/Home'
import { RouteObject } from 'react-router-dom'
import { makeGetSearchType } from '../usecases/get.searchType.factory'

export const makeWelomeHomePage: RouteObject = {
  path: ROUTER_PATHS.WELCOME,
  element: <HomePage />,
  action: async ({ request }) => {
    switch (request.method) {
      case 'POST': {
        const formData = await request.formData()
        const searchType = formData.get('searchType')!.toString()
        const inputQuery = formData.get('inputQuery')!.toString()
        const response = await makeGetSearchType(
          searchType,
          inputQuery
        ).handle()
        return response.data
      }
      default: {
        throw new Response('', { status: 405 })
      }
    }
  },
  errorElement: <ErrorBoundary />
}
