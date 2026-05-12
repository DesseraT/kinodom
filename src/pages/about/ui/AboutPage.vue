<script setup lang="ts">
import { watch } from 'vue'
import { Navbar } from '@/widgets/navbar'
import { Footer } from '@/widgets/footer'
import { useInfoStore } from '@/entities/movieInfo'
import { MovieInfo } from '@/entities/movieInfo'
const props = defineProps<{
  movieId: string | number
}>()
const movieStore = useInfoStore()
watch(
  () => props.movieId,
  (newId) => {
    if (newId) movieStore.getMovieInfo(Number(newId))
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <Navbar />
    <MovieInfo
      v-if="movieStore.movieInfo"
      :info="movieStore.movieInfo || {}"
      :recommendedMovies="movieStore.recommendedMovies || []"
    />
    <Footer />
  </div>
</template>
