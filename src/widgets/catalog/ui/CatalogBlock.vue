<script setup lang="ts">
import { useMoviesStore } from '@/entities/movieItem/model/moviesStore'
import { MovieList } from '@/features/movieList'
import { MyBtn } from '@/shared/btn'
import { computed, onMounted } from 'vue'
import {COMEDY_GENRE_ID, DRAMA_GENRE_ID, FANTASY_GENRE_ID, TRILLER_GENRE_ID, DETECTIVE_GENRE_ID} from '../model/const'
const moviesStore = useMoviesStore()
const isMovieDataEmpty = computed(()=> {
return Object.keys(moviesStore.moviesByGenre).length == 0
})
onMounted(() => {
  if(isMovieDataEmpty.value) {
    moviesStore.getMoviesByGenre(COMEDY_GENRE_ID)
    moviesStore.getMoviesByGenre(DRAMA_GENRE_ID)
    moviesStore.getMoviesByGenre(FANTASY_GENRE_ID)
    moviesStore.getMoviesByGenre(TRILLER_GENRE_ID)
    moviesStore.getTVShowsByGenre(DETECTIVE_GENRE_ID)
  }
})
</script>

<template>
  <section class="w-full text-white py-16 px-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 tracking-tight">Каталог фильмов и сериалов</h2>
      <div class="max-w-7xl space-y-12 overflow-hidden" v-if="!isMovieDataEmpty">
        <!-- while genres are not loaded ref for scroll inside would be the same for every MovieList = unexpected behavior -->
        <MovieList
          :title="moviesStore.movieGenres[COMEDY_GENRE_ID] || 'COMEDY'"
          :movies="moviesStore.moviesByGenre[COMEDY_GENRE_ID] || []"
        />
        <MovieList
          :title="moviesStore.movieGenres[DRAMA_GENRE_ID] || 'DRAMA'"
          :movies="moviesStore.moviesByGenre[DRAMA_GENRE_ID] || []"
        />
        <MovieList
          :title="moviesStore.movieGenres[FANTASY_GENRE_ID] || 'FANTASY'"
          :movies="moviesStore.moviesByGenre[FANTASY_GENRE_ID] || []"
        />
        <MovieList
          :title="moviesStore.movieGenres[TRILLER_GENRE_ID] || 'TRILLER'"
          :movies="moviesStore.moviesByGenre[TRILLER_GENRE_ID] || []"
        />
        <MovieList
          :title="moviesStore.tvGenres[DETECTIVE_GENRE_ID] || 'DETECTIVE'"
          :movies="moviesStore.tvShowsByGenre[DETECTIVE_GENRE_ID] || []"
        />
      </div>
      <MyBtn :type="'outline'">Посмотреть еще</Mybtn>
    </div>
  </section>
</template>
