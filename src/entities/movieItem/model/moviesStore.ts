import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import {
  discoverMovie,
  discoverTv,
  genreMovieList,
  genreTvList,
  moviePopularList,
} from '@/shared/api/tmdb'
import type {
  // GenreMovieList200GenresItem,
  DiscoverMovieParams,
  DiscoverTvParams,
} from '@/shared/model/types'
import type { IGenreMap, IMovie } from '@/entities/movieItem'
import { parseMovieTvList } from '@/shared/api/convertApi'

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

export const useMoviesStore = defineStore('movies', () => {
  const moviesByGenre = ref<Record<number, IMovie[]>>({})
  const tvShowsByGenre = ref<Record<number, IMovie[]>>({})
  const movieGenres = ref<IGenreMap>({})
  const tvGenres = ref<IGenreMap>({})
  const popularMovies = ref<IMovie[]>([])

  onMounted(async () => {
    await getMovieGenres()
    await gettvGenres()
    getMoviesByGenre(35)
    getMoviesByGenre(18)
    getMoviesByGenre(14)
    getMoviesByGenre(53)
    getTVShowsByGenre(9648)
    getPopular()
  })

  const getMovieGenres = async () => {
    const { genres } = await genreMovieList()
    if (genres) {
      genres.forEach((g) => {
        movieGenres.value[g.id] = capitalize(g.name)
      })
    }
  }
  const gettvGenres = async () => {
    const { genres } = await genreTvList()
    if (genres) {
      genres.forEach((g) => {
        tvGenres.value[g.id] = capitalize(g.name)
      })
    }
  }

  const getMoviesByGenre = async (genreId: number) => {
    const params: DiscoverMovieParams = {
      with_genres: String(genreId),
    }
    const { results } = await discoverMovie(params)
    if (results) {
      moviesByGenre.value[genreId] = parseMovieTvList(results, movieGenres.value)
    }
  }

  const getTVShowsByGenre = async (genreId: number) => {
    const params: DiscoverTvParams = {
      with_genres: String(genreId),
    }
    const { results } = await discoverTv(params)
    if (results) {
      tvShowsByGenre.value[genreId] = parseMovieTvList(results, tvGenres.value, 'Сериал', 'w200')
    }
  }
  const getPopular = async () => {
    try {
      const { results } = await moviePopularList()
      popularMovies.value = parseMovieTvList(results, movieGenres.value)
    } catch (error) {
      console.log('getPopular', error)
    }
  }

  return {
    moviesByGenre,
    tvShowsByGenre,
    movieGenres,
    tvGenres,
    popularMovies,
  }
})
