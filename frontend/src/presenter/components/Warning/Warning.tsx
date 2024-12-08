import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'

type Props = {
  message: string
}
export const Warning = ({ message }: Props) => {
  const navigation = useNavigate()
  const goBack = (event: MouseEvent) => {
    event.preventDefault()
    navigation(ROUTER_PATHS.WELCOME)
  }
  return (
    <>
      <div className="p-4 mb-4 text-sm" role="alert">
        <p className="font-bold ">Warning</p>
        <p>{message}</p>
      </div>
      <Button onClick={(e) => goBack(e)}>BACK TO SEARCH</Button>
    </>
  )
}
