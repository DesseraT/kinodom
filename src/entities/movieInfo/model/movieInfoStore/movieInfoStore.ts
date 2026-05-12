import { defineStore } from 'pinia'
import { ref } from 'vue'
import { movieDetails, movieRecommendations } from '@/shared/api/tmdb'
import { parseMovieDetails, parseMovieTvList } from '@/shared/api/convertApi'
import { useMoviesStore } from '@/entities/movieItem'
export const useInfoStore = defineStore('infoStore', () => {
  const moviesStore = useMoviesStore()
  const movieInfo = ref()
  const recommendedMovies = ref()
  const getMovieInfo = async (movieId: number) => {
    const data = await movieDetails(movieId)
    movieInfo.value = parseMovieDetails(data)
    getRecomended(movieId)
  }
  const getRecomended = async (movieId: number) => {
    const { results } = await movieRecommendations(movieId)
    recommendedMovies.value = parseMovieTvList(results, moviesStore.movieGenres)
  }
  return {
    getMovieInfo,
    movieInfo,
    recommendedMovies,
  }
})
