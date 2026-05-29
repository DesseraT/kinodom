<script setup lang="ts">
import { useSearch } from '../model/searchStore'
import { MovieItem } from '@/entities/movieItem'
import { X as CloseIcon, SearchIcon } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const searchStore = useSearch()

onMounted(() => {
  searchStore.$reset()
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="fixed inset-0 z-100 overflow-y-auto bg-black/80 backdrop-blur-md text-white px-6 py-10 md:px-20"
    v-if="searchStore.movies.length > 0 || searchStore.people.length > 0 || searchStore.query"
  >
    <div class="max-w-7xl mx-auto">
      <header class="flex items-center gap-8 md:gap-20 mb-16">
        <div class="text-2xl font-bold tracking-tighter shrink-0 uppercase">
          Кино<span class="text-red-600">дом</span>
        </div>

        <div class="relative flex-1 group">
          <SearchIcon
            class="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"
            :size="20"
          />
          <input
            v-model="searchStore.query"
            type="text"
            placeholder="Название фильма, сериала, или имя актёра, режиссёра"
            class="w-full bg-transparent border-b border-zinc-800 py-3 px-10 outline-none focus:border-white transition-all text-xl placeholder:text-zinc-600"
            @input="searchStore.debouncedSearch"
          />
          <button
            @click="() => emit('close')"
            class="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          >
            <CloseIcon :size="24" />
          </button>
        </div>
      </header>

      <main>
        <section v-if="searchStore.movies.length > 0" class="mb-20">
          <h2 class="text-3xl font-bold mb-10">
            {{ searchStore.query ? `По вашему запросу "${searchStore.query}"` : 'Часто ищут' }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10">
            <MovieItem
              v-for="movie in searchStore.movies.slice(0, 6)"
              :key="movie.id"
              v-bind="movie"
              class="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </div>
        </section>

        <section v-if="searchStore.people.length > 0">
          <h3
            class="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 border-b border-zinc-900 pb-4"
          >
            Актёры и режиссёры
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
            <div
              v-for="person in searchStore.people"
              :key="person.id"
              class="group cursor-pointer flex flex-col gap-1"
            >
              <span class="text-lg text-zinc-200 group-hover:text-red-500 transition-colors">
                {{ person.name }}
              </span>
              <span class="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
                {{ person?.known_for_department || 'Актёр' }}
              </span>
            </div>
          </div>
        </section>

        <div
          v-if="
            searchStore.query && searchStore.movies.length === 0 && searchStore.people.length === 0
          "
          class="mt-20 text-center text-zinc-500"
        >
          <p class="text-lg italic">По вашему запросу ничего не найдено</p>
        </div>
      </main>
    </div>
  </div>
</template>
