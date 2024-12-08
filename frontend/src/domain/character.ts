import { Film } from './film'

export type Character = {
  name: string
  height: string
  mass: string
  gender: string
  url: string
  bday: string
  eyecolor: string
  haircolor: string
  films: Film[]
}
