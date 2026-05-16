import type { IMovie, MovieType, IGenreMap } from '@/entities/movieItem'
import type { SearchMulti200ResultsItem } from '../model/types'
type PosterSize = `w${number}`

/**
 *
 * @param apiMovies data list with movies/tv shows requested by
 * @param genres Map<K,V> of genres, K = genre_id, V = genre_name
 * @param type used in MovieItem.vue to display data item information
 * @param posterSize use to get neccessary posterSize from API: w150, w200, w500
 * @returns narrowed list according to type IMovie
 */
export const parseMovieTvList = (
  apiMovies: any[],
  genres: IGenreMap,
  type: MovieType = 'Фильм',
  posterSize: PosterSize = 'w500',
): IMovie[] => {
  const narrowedMovies: IMovie[] = []
  apiMovies.forEach((el, index) => {
    narrowedMovies[index] = {
      id: el.id,
      title: el.title || el.name,
      poster_path: `https://image.tmdb.org/t/p/${posterSize}/](https://image.tmdb.org/t/p/${posterSize}/${el.poster_path}`,
      type: type,
      rating: el.vote_average,
      genres: el?.genre_ids?.map((g) => genres[g]),
    }
  })
  return narrowedMovies
}
/*
wanted to probably extract data with mapped genres here, but decided to do it inside movieStore
*/
// export const getMovies = async (genreId: number, genres: IGenreMap) => {
//   try {
//     const params = {
//       with_genres: String(genreId),
//     }
//     const { results } = await discoverMovie(params)
//     return parseMovieTvList(results, genres)
//   } catch (e) {
//     console.log('getMovies error', e)
//   }
// }

// export const getTvShows = async (genreId: number, genres: IGenreMap) => {
//   try {
//     const params = {
//       with_genres: String(genreId),
//     }
//     const { results } = await discoverTv(params)
//     return parseMovieTvList(results, genres, 'Сериал')
//   } catch (e) {
//     console.log('getMovies error', e)
//   }
// }
export const parsePeople = (data: any[]): IPerson[] => {
  return data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      gender: el.gender,
      known_for: el.known_for,
      known_for_department: el.known_for_department,
      profile_path: el.profile_path,
    }
  })
}

type MediaType = 'tv' | 'movie' | 'person'

export interface IPerson {
  id: number
  name: string
  gender: number
  known_for: IMovie[]
  known_for_department: string[]
  profile_path: string
}
export const parseQuired = (
  data: SearchMulti200ResultsItem[] = [],
  movieGenres: IGenreMap = {},
  tvGenres: IGenreMap = {},
) => {
  const people = data.filter((el) => el.media_type == 'person')
  const movies = data.filter((el) => el.media_type == 'movie')
  const tvShows = data.filter((el) => el.media_type == 'tv')
  return {
    movies: [...parseMovieTvList(movies, movieGenres), ...parseMovieTvList(tvShows, tvGenres)],
    people: parsePeople(people),
  }
}
export interface IMovieProps {
  title: string
  backdrop_path: string
  poster_path: string
  release_date: string
  runtime: number
  overview: string
  genres: IGenre[]
  vote_average: number
  tagline: string
  budget: number
  revenue: number
  status: string
}
export const parseMovieDetails = (data: any[]): IMovieProps => {
  return data
}
