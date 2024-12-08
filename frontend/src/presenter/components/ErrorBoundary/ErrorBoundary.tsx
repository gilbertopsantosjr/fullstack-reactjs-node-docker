import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import { MouseEvent } from 'react'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom'
import { Button } from '../Button/Button'

const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const navigation = useNavigate()
  let errorMessage: string

  const goBack = (event: MouseEvent) => {
    event.preventDefault()
    navigation(ROUTER_PATHS.WELCOME)
  }

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  console.error(errorMessage)

  return (
    <>
      <h2> such a shame !</h2>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <Button onClick={(e) => goBack(e)}>BACK TO SEARCH</Button>
    </>
  )
}

export default ErrorBoundary
