import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tmdbClient } from '@/shared/api/tmdbClient'
import type { IMovie } from '@/entities/movieItem'

type MediaType = 'movie' | 'tv'

export const useMoviesStore = defineStore('movies', () => {
  const moviesByGenre = ref<Record<number, IMovie[]>>({})

  const getMoviesByGenre = async (type: MediaType, genre: number) => {
    try {
      const { data } = await tmdbClient.get(`/discover/${type}`, {
        params: {
          with_genres: genre,
          sort_by: 'popularity.desc',
        },
      })

      const formattedMovies: IMovie[] = data.results.map((item: any) => {
        return {
          id: item.id,
          title: item.title || item.name,
          posterUrl: item.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
            : 'https://via.placeholder.com/500x300',
          rating: item.vote_average,
          type: 'Фильм',
          genres: genre === 35 ? ['Комедия'] : ['Боевик'], //TMP, todo: parse by some enum
        }
      })
      moviesByGenre.value[genre] = formattedMovies
    } catch (error) {
      console.error(`error getMoviesByGenre with ${type}, ${genre}:`, error)
    }
  }

  return {
    moviesByGenre,
    getMoviesByGenre,
  }
})
