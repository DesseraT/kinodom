import { defineStore } from 'pinia'
import { searchMulti } from '@/shared/api/tmdb'
import { computed, ref } from 'vue'
import { useMoviesStore, type IMovie } from '@/entities/movieItem'
import { parseQuired } from '@/shared/api/convertApi'
import type { IPerson } from '@/shared/api/convertApi'
import debounce from 'debounce'
import type { SearchMulti200ResultsItem } from '@/shared/model/types'
const DEBOUNCE_DELAY = 500
//probaly it`s better to slice data inside component,because store can provide all data in future for another components
const MOVIE_ITEMS_QUANTITY = 6
const PEOPLE_ITEMS_QUANTITY = 6

export const useSearch = defineStore('searchStore', () => {
  const { movieGenres, tvGenres, popularMovies } = useMoviesStore()
  let currentRequest: ReturnType<typeof searchMulti> | null = null
  const query = ref('')
  const searchedMovies = ref<IMovie[]>([])
  const searchedPeople = ref<IPerson[]>([])

  const movies = computed(() => {
    if (query.value) {
      return searchedMovies.value.slice(0, MOVIE_ITEMS_QUANTITY)
    }
    return popularMovies.slice(0, 6)
  })
  const people = computed(() => {
    if (query.value) {
      return searchedPeople.value.slice(0, PEOPLE_ITEMS_QUANTITY)
    }
    return []
  })
  const $reset = () => {
    query.value = ''
  }

  const search = async () => {
    query.value.trim()
    if (!query.value) {
      searchedMovies.value = popularMovies
      searchedPeople.value = []
    }
    if (currentRequest) {
      currentRequest.cancel()
    }
    try {
      currentRequest = searchMulti({ query: query.value })
      const { results } = await currentRequest
      const parsed = parseQuired(results as SearchMulti200ResultsItem[], movieGenres, tvGenres)

      searchedMovies.value = parsed.movies.slice(0, 6)
      searchedPeople.value = parsed.people.slice(0, 6)
    } catch (e) {
      console.error(`search error with query ${query.value} and message:`, e)
    }
  }
  const debouncedSearch = debounce(search, DEBOUNCE_DELAY)

  return {
    query,
    debouncedSearch,
    movies,
    people,
    $reset,
  }
})
