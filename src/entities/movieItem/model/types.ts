type MovieType = 'Фильм' | 'Сериал'
interface IMovie {
  id: number
  title: string
  poster_path: string
  type: MovieType
  rating: number
  genres: string[]
}
type IGenreMap = Record<number, string>

export type { IMovie, MovieType, IGenreMap }
