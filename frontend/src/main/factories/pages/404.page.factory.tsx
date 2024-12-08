import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import ErrorBoundary from '@/presenter/components/ErrorBoundary/ErrorBoundary'
import { Warning } from '@/presenter/components/Warning/Warning'
import { RouteObject } from 'react-router-dom'

export const makeError404Page: RouteObject = {
  path: ROUTER_PATHS.CATCH_ALL,
  element: <Warning message="Page Not Found" />,
  errorElement: <ErrorBoundary />
}
