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
  DiscoverMovie200ResultsItem,
  DiscoverMovieParams,
  DiscoverTvParams,
} from '@/shared/model/types'
import type { IGenreMap, IMovie } from '@/entities/movieItem'
import { parseMovieTvList } from '@/shared/api/convertApi'

function capitalize(str: string): string {
  if (!str) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const useMoviesStore = defineStore('movies', () => {
  const moviesByGenre = ref<Record<number, IMovie[]>>({})
  const tvShowsByGenre = ref<Record<number, IMovie[]>>({})
  const movieGenres = ref<IGenreMap>({})
  const tvGenres = ref<IGenreMap>({})
  const popularMovies = ref<IMovie[]>([])

  onMounted(() => {
    getMovieGenres()
    getTvGenres()
    getPopular()
  })

  const getMovieGenres = async () => {
    //prevent extra request
    // if()
    const { genres } = await genreMovieList()
    if (genres) {
      genres.forEach((g) => {
        if (g.id !== undefined && g.name !== undefined) {
          movieGenres.value[g.id] = capitalize(g.name) ?? ''
        }
      })
    }
  }
  const getTvGenres = async () => {
    const { genres } = await genreTvList()
    if (genres) {
      genres.forEach((g) => {
        if (g.id !== undefined && g.name !== undefined) {
          tvGenres.value[g.id] = capitalize(g.name) ?? ''
        }
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
      tvShowsByGenre.value[genreId] = parseMovieTvList(results, tvGenres.value, 'tv', 'w200')
    }
  }
  const getPopular = async () => {
    try {
      const { results } = await moviePopularList()
      popularMovies.value = parseMovieTvList(
        results as DiscoverMovie200ResultsItem[],
        movieGenres.value,
      )
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
    getMoviesByGenre,
    getTVShowsByGenre,
    getPopular,
  }
})
