import { defineStore } from 'pinia'
import { searchMulti } from '@/shared/api/tmdb'
import { onMounted, ref } from 'vue'
import { useMoviesStore } from '@/entities/movieItem'
import { parseQuired } from '@/shared/api/convertApi'

export const useSearch = defineStore('searchStore', () => {
  const { movieGenres, tvGenres, popularMovies } = useMoviesStore()

  let currentRequest: ReturnType<typeof searchMulti> | null = null
  const query = ref('')
  const searchedMovies = ref()
  const searchedPeople = ref()

  onMounted(() => {
    //get from own request | get from MovieList with Popular search
    searchedMovies.value = popularMovies
  })

  const search = async (searchQuery: string) => {
    query.value = searchQuery.trim()
    if (!query.value) {
      searchedMovies.value = popularMovies
    }
    if (currentRequest) {
      currentRequest.cancel()
    }
    try {
      currentRequest = searchMulti({ query: query.value })
      const { results } = await currentRequest
      const parsed = parseQuired(results, movieGenres, tvGenres)

      searchedMovies.value = parsed.movies
      searchedPeople.value = parsed.people
    } catch (e) {
      console.error(`search error with query ${query.value} and message:`, e)
    }
  }

  return {
    query,
    search,
    searchedMovies,
    searchedPeople,
  }
})
