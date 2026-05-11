<script setup lang="ts">
import debounce from 'debounce'
import { useSearch } from '../model/searchStore'
import { MovieItem } from '@/entities/movieItem'

const DEBOUNCE_DELAY = 500

const searchStore = useSearch()

const debouncedSearch = debounce(searchStore.search, DEBOUNCE_DELAY)
</script>

<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md text-white px-6 py-10 md:px-20"
    v-if="searchStore.searchedMovies || searchStore.searchedPeople"
  >
    <div class="max-w-7xl mx-auto">
      <header class="flex items-center gap-12 mb-16">
        <div class="relative flex-1 group">
          <input
            v-model="searchStore.query"
            type="text"
            placeholder="Название фильма, сериала, или имя актёра, режиссёра"
            class="w-full bg-transparent border-b border-zinc-800 py-3 px-10 outline-none focus:border-red-600 transition-all text-xl placeholder:text-zinc-600"
            @input="debouncedSearch(searchStore.query)"
          />
        </div>
      </header>

      <main>
        <section v-if="searchStore.searchedMovies.length > 0">
          <h2 class="text-3xl font-bold mb-10">Часто ищут</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
            <MovieItem
              v-for="movie in searchStore.searchedMovies"
              :key="movie.id"
              v-bind="movie"
              class="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </div>
        </section>

        <div
          v-else-if="
            searchStore.searchedMovies.length == 0 && searchStore.searchedPeople.length == 0
          "
          class="mt-20 text-center text-zinc-500"
        >
          <p class="text-lg">По вашему запросу ничего не найдено</p>
        </div>
      </main>
    </div>
  </div>
</template>
