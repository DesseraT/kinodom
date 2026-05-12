import { defineStore } from 'pinia'
import { searchMulti } from '@/shared/api/tmdb'
import { onMounted, ref } from 'vue'
import { useMoviesStore, type IMovie } from '@/entities/movieItem'
import { parseQuired } from '@/shared/api/convertApi'
import type { IPerson } from '@/shared/api/convertApi'

export const useSearch = defineStore('searchStore', () => {
  const { movieGenres, tvGenres, popularMovies } = useMoviesStore()

  let currentRequest: ReturnType<typeof searchMulti> | null = null
  const query = ref('')
  const searchedMovies = ref<IMovie[]>([])
  const searchedPeople = ref<IPerson[]>([])

  onMounted(() => {
    //get from own request | get from MovieList with Popular search
    searchedMovies.value = popularMovies.slice(0, 6) // move this slicing to some computed,which will provide only required quantity of data
  })

  const search = async (searchQuery: string) => {
    query.value = searchQuery.trim()
    if (!query.value) {
      searchedMovies.value = popularMovies.slice(0, 6)
    }
    if (currentRequest) {
      currentRequest.cancel()
    }
    try {
      currentRequest = searchMulti({ query: query.value })
      const { results } = await currentRequest
      /* how to prevent IDE warnings?
      like Argument of type 'SearchMulti200ResultsItem[] | undefined' is not assignable to parameter of type 'SearchMulti200ResultsItem[]
      api provides type with all optional keys
      */
      const parsed = parseQuired(results, movieGenres, tvGenres)

      searchedMovies.value = parsed.movies.slice(0, 6)
      searchedPeople.value = parsed.people.slice(0, 6)
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
