<script setup lang="ts">
import { onMounted } from 'vue'
import { useMoviesStore } from '@/features/movieList/model/movieStore'
import { MovieList } from '@/features/movieList'
import { MyBtn } from '@/shared/btn'

const moviesStore = useMoviesStore()

onMounted(() => {
  moviesStore.getMoviesByGenre('movie', 35)
  moviesStore.getMoviesByGenre('movie', 28)
})
</script>

<template>
  <section class="w-full text-white py-16 px-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 tracking-tight">Каталог фильмов и сериалов</h2>
      <div class="max-w-7xl mx-auto px-6 md:px-10 space-y-12 overflow-hidden">
        <MovieList title="Комедии" :movies="moviesStore.moviesByGenre[35] || []" />
        <MovieList title="Боевики" :movies="moviesStore.moviesByGenre[28] || []" />
      </div>
      <MyBtn :text="'Посмотреть еще'" :type="'outline'" />
    </div>
  </section>
</template>
