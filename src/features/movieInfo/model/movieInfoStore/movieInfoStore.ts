import { defineStore } from 'pinia'
import { ref } from 'vue'
import { movieDetails, movieRecommendations } from '@/shared/api/tmdb'
import { parseMovieTvList } from '@/shared/api/convertApi'
import { useMoviesStore } from '@/entities/movieItem'
import type { DiscoverMovie200ResultsItem } from '@/shared/model/types'
export const useInfoStore = defineStore('infoStore', () => {
  const moviesStore = useMoviesStore()
  const movieInfo = ref()
  const recommendedMovies = ref()
  const getMovieInfo = async (movieId: number) => {
    const data = await movieDetails(movieId)
    movieInfo.value = data
    getRecomended(movieId)
  }
  const getRecomended = async (movieId: number) => {
    const { results } = await movieRecommendations(movieId)
    recommendedMovies.value = parseMovieTvList(
      results as DiscoverMovie200ResultsItem[],
      moviesStore.movieGenres,
    )
  }
  const $reset = () => {
    movieInfo.value = {}
  }
  return {
    getMovieInfo,
    movieInfo,
    recommendedMovies,
    $reset,
  }
})
