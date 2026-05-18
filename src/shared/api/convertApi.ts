import type { IMovie, IGenreMap } from '@/entities/movieItem'
import type {
  SearchMulti200ResultsItem,
  GenreTvList200GenresItem,
  DiscoverMovie200ResultsItem,
  DiscoverTv200ResultsItem,
  SearchPerson200ResultsItem,
  SearchPerson200ResultsItemKnownForItem,
} from '../model/types'
type PosterSize = `w${number}` | 'original'
type MediaType = 'tv' | 'movie' | 'person'
type ApiMovieType =
  | DiscoverMovie200ResultsItem
  | DiscoverTv200ResultsItem
  | SearchPerson200ResultsItemKnownForItem
/**
 *
 * @param apiMovies data list with movies/tv shows requested by
 * @param genres Map<K,V> of genres, K = genre_id, V = genre_name
 * @param type used in MovieItem.vue to display data item information
 * @param posterSize use to get neccessary posterSize from API: w150, w200, w500 or original
 * @returns narrowed list according to type IMovie
 */
export const parseMovieTvList = (
  apiMovies: ApiMovieType[],
  genresMap: IGenreMap,
  type: Exclude<MediaType, 'person'> = 'tv',
  posterSize: PosterSize = 'original',
): IMovie[] => {
  if (!apiMovies || !Array.isArray(apiMovies)) return []
  const narrowedMovies: IMovie[] = []
  apiMovies.forEach((el, index) => {
    let title = ''
    if ('title' in el && el.title) {
      title = el.title
    } else if ('name' in el && el.name) {
      title = el.name
    }
    let computedType = type
    if ('media_type' in el && el.media_type) {
      computedType = el.media_type === 'movie' ? 'movie' : 'tv'
    }

    narrowedMovies[index] = {
      id: el.id ?? -1,
      title: title,
      poster_path: el.poster_path
        ? `https://image.tmdb.org/t/p/${posterSize}/${el.poster_path}`
        : '',
      type: computedType == 'movie' ? 'Фильм' : 'Сериал',
      rating: el.vote_average ?? 0,
      genres: el.genre_ids?.map((g) => genresMap[g] ?? '').filter((g) => g !== '') || [],
    }
  })
  return narrowedMovies
}

/**
 * parses searched people to required structure
 * @param people
 * @param moviesGenres
 * @param tvGenres
 * @returns
 */
export const parsePeople = (
  people: SearchPerson200ResultsItem[],
  moviesGenres: IGenreMap,
  tvGenres: IGenreMap,
): IPerson[] => {
  return people.map((person) => {
    const known_for: IMovie[] = person.known_for
      ? parseMovieTvList(person.known_for, { ...moviesGenres, ...tvGenres })
      : []
    return {
      id: person.id ?? -1,
      name: person.name ?? '',
      gender: person.gender ?? -1,
      known_for: known_for,
      known_for_department: person.known_for_department ?? '',
      profile_path: person.profile_path ?? '',
    }
  })
}

export interface IPerson {
  id: number
  name: string
  gender: number
  known_for: IMovie[]
  known_for_department: string
  profile_path: string
}
export const parseQuired = (
  data: SearchMulti200ResultsItem[],
  movieGenres: IGenreMap,
  tvGenres: IGenreMap,
) => {
  const people = data.filter((el) => el.media_type == 'person')
  const movies = data.filter((el) => el.media_type == 'movie')
  const tvShows = data.filter((el) => el.media_type == 'tv')
  return {
    movies: [...parseMovieTvList(movies, movieGenres), ...parseMovieTvList(tvShows, tvGenres)],
    people: parsePeople(people, movieGenres, tvGenres),
  }
}
export interface IMovieProps {
  title: string
  backdrop_path: string
  poster_path: string
  release_date: string
  runtime: number
  overview: string
  genres: GenreTvList200GenresItem[]
  vote_average: number
  tagline: string
  budget: number
  revenue: number
  status: string
}
