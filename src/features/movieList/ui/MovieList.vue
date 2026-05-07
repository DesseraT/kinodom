<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { MovieItem } from '@/entities/movieItem'
import type { IMovie } from '@/entities/movieItem'

import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps<{
  title: string
  movies: IMovie[]
}>()

const modules = [Navigation]

const nextBtnClass = `btn-next-${props.title}`
const prevBtnClass = `btn-prev-${props.title}`
</script>

<template>
  <div class="movie-slider-wrapper w-full pb-6 text-white relative">
    <h2 class="text-2xl font-bold mb-5 tracking-tight px-1">
      {{ title }}
    </h2>

    <div class="mx-15 overflow-hidden">
      <Swiper
        v-if="movies.length > 0"
        :modules="modules"
        :space-between="24"
        slides-per-view="auto"
        :navigation="{
          nextEl: '.' + nextBtnClass,
          prevEl: '.' + prevBtnClass,
        }"
        class="!overflow-visible"
      >
        <SwiperSlide v-for="movie in movies" :key="movie.id" class="!w-auto">
          <MovieItem v-bind="movie" class="w-70 md:w-72.5 shrink-0" />
        </SwiperSlide>
      </Swiper>
    </div>

    <button
      :class="[prevBtnClass]"
      class="absolute left-0 top-[55%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer disabled:hidden"
    >
      <span class="text-xl">←</span>
    </button>

    <button
      :class="[nextBtnClass]"
      class="absolute right-0 top-[55%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer disabled:hidden"
    >
      <span class="text-xl">→</span>
    </button>
  </div>
</template>

<style>
.movie-slider-wrapper .swiper {
  overflow: visible !important;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  display: none !important;
}
</style>
