import { Character } from '@/domain/character'
import { ROUTER_PATHS } from '@/infra/utils/path.utils'
import { Button } from '@/presenter/components'
import { MouseEvent } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

export const CharacterPage = () => {
  const data = useLoaderData() as Character
  const navigation = useNavigate()

  const goBack = (event: MouseEvent) => {
    event.preventDefault()
    navigation(ROUTER_PATHS.WELCOME)
  }

  return (
    <div className="bg-white shadow rounded min-h-96 max-h-full overflow-auto p-6">
      <h1 className="font-bold"> {data.name} </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="mt-2 mr-6">
          <h2
            className="font-bold pb-2"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            Details
          </h2>
          <p> Birth Year: {data.bday} </p>
          <p> Gender: {data.gender} </p>
          <p> Eye Color: {data.eyecolor} </p>
          <p> Hair Color: {data.haircolor} </p>
          <p> Height: {data.height} </p>
          <p> Mass: {data.mass} </p>
        </div>
        <div className="mt-2 ml-6">
          <h2
            className="font-bold pb-2"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            Movies
          </h2>

          {data.films.map((film) => (
            <Link
              key={film.url}
              className="text-sky-600 hover:underline decoration-solid mr-1"
              to={`/detail/${film.url}`}
            >
              {film.name},
            </Link>
          ))}
        </div>
      </div>

      <Button onClick={(e) => goBack(e)}>BACK TO SEARCH</Button>
    </div>
  )
}
