<script setup lang="ts">
import { useMoviesStore } from '@/entities/movieItem/model/moviesStore'
import { MovieList } from '@/features/movieList'
import { MyBtn } from '@/shared/btn'

const moviesStore = useMoviesStore()
</script>

<template>
  <section class="w-full text-white py-16 px-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 tracking-tight">Каталог фильмов и сериалов</h2>
      <div class="max-w-7xl space-y-12 overflow-hidden">
        <!-- while genres are not loaded ref for scroll inside would be the same for every MovieList = unexpected behavior -->
        <MovieList
          :title="moviesStore.movieGenres[35] || '35'"
          :movies="moviesStore.moviesByGenre[35] || []"
        />
        <MovieList
          :title="moviesStore.movieGenres[18] || '18'"
          :movies="moviesStore.moviesByGenre[18] || []"
        />
        <MovieList
          :title="moviesStore.movieGenres[14] || '14'"
          :movies="moviesStore.moviesByGenre[14] || []"
        />
        <MovieList
          :title="moviesStore.movieGenres[53] || '53'"
          :movies="moviesStore.moviesByGenre[53] || []"
        />
        <MovieList
          :title="moviesStore.tvGenres[9648] || '9648'"
          :movies="moviesStore.tvShowsByGenre[9648] || []"
        />
      </div>
      <MyBtn :type="'outline'">Посмотреть еще</Mybtn>
    </div>
  </section>
</template>
