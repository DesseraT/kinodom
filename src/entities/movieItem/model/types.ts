type MovieType = 'Фильм' | 'Сериал'
interface IMovie {
  id: number
  title: string
  poster_path: string
  type: MovieType
  rating: number
  genres: Capitalize<string>[]
}
type IGenreMap = Record<number, Capitalize<string>>

export type { IMovie, MovieType, IGenreMap }
