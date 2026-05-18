<script setup lang="ts">
import { watch } from 'vue'
import { Navbar } from '@/widgets/navbar'
import { Footer } from '@/widgets/footer'
import { useInfoStore } from '@/features/movieInfo'
import { MovieInfo } from '@/features/movieInfo'
const props = defineProps<{
  movieId: string | number
}>()
const movieStore = useInfoStore()
watch(
  () => props.movieId,
  (newId) => {
    if (newId) {
      movieStore.$reset()
      movieStore.getMovieInfo(Number(newId))
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <Navbar />
    <MovieInfo
      v-if="movieStore.movieInfo.id"
      :info="movieStore.movieInfo || {}"
      :recommendedMovies="movieStore.recommendedMovies || []"
    />
    <Footer />
  </div>
</template>
