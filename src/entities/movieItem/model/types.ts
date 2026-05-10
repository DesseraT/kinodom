interface IMovie {
  id: number
  title: string
  posterUrl: string
  type: string
  rating: number
  genres: Capitalize<string>[]
}
export type { IMovie }
