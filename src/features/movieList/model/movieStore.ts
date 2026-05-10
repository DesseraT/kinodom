import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { discoverMovie, discoverTv, genreMovieList, genreTvList } from '@/shared/api/tmdb'
import type {
  // GenreMovieList200GenresItem,
  DiscoverMovieParams,
  DiscoverTvParams,
} from '@/shared/model/types'
import type { IMovie } from '@/entities/movieItem'

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

// function createMap(a: Required<GenreMovieList200GenresItem>[]) {
//   const map = new Map()
//   for (const el of a) {
//     el.name = capitalize(el.name)
//     map.set(el.name, el.id)
//   }
//   return map
// }
// function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
//   const result = {} as Pick<T, K>
//   keys.forEach((key) => {
//     if (key in obj) {
//       result[key] = obj[key]
//     }
//   })
//   return result
// }

export const useMoviesStore = defineStore('movies', () => {
  const moviesByGenre = ref<Record<number, IMovie[]>>({})
  const tvShowsByGenre = ref<Record<number, IMovie[]>>({})
  const movieGenres = ref<Record<number, Capitalize<string>>>({})
  const tvGenres = ref<Record<number, Capitalize<string>>>({})

  const getMovieGenres = async () => {
    const { genres } = await genreMovieList()
    if (genres) {
      genres.forEach((g) => {
        if (g.id && g.name) movieGenres.value[g.id] = capitalize(g.name)
      })
    }
  }
  const gettvGenres = async () => {
    const { genres } = await genreTvList()
    if (genres) {
      genres.forEach((g) => {
        if (g.id && g.name) tvGenres.value[g.id] = capitalize(g.name)
      })
    }
  }

  onMounted(async () => {
    await getMovieGenres()
    await gettvGenres()
    getMoviesByGenre(35)
    getMoviesByGenre(18)
    getMoviesByGenre(14)
    getMoviesByGenre(53)
    getTVShowsByGenre(9648)
  })

  const getMoviesByGenre = async (genreId: number) => {
    const params: DiscoverMovieParams = {
      with_genres: String(genreId),
    }
    const { results } = await discoverMovie(params)

    if (results) {
      const narrowedMovies: IMovie[] = []
      results.forEach((el, index) => {
        narrowedMovies[index] = {
          id: el.id,
          title: el.title || el.name,
          posterUrl: `https://image.tmdb.org/t/p/w500/](https://image.tmdb.org/t/p/w500/${el.poster_path}`,
          type: 'Фильм',
          rating: el?.vote_average,
          genres: el.genre_ids?.map((g) => movieGenres.value[g]),
        }
      })
      moviesByGenre.value[genreId] = narrowedMovies
    }
  }

  const getTVShowsByGenre = async (genreId: number) => {
    const params: DiscoverTvParams = {
      with_genres: String(genreId),
    }
    const { results } = await discoverTv(params)
    if (results) {
      const narrowedMovies: IMovie[] = []
      results.forEach((el, index) => {
        narrowedMovies[index] = {
          id: el.id,
          title: el.title || el.name,
          posterUrl: `https://image.tmdb.org/t/p/w500/](https://image.tmdb.org/t/p/w500/${el.poster_path}`,
          type: 'Сериал',
          rating: el?.vote_average,
          genres: el.genre_ids?.map((g) => tvGenres.value[g]),
        }
      })
      tvShowsByGenre.value[genreId] = narrowedMovies
    }
  }

  return {
    moviesByGenre,
    tvShowsByGenre,
    movieGenres,
    tvGenres,
  }
})
