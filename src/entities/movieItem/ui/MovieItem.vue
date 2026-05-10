<template>
  <div class="group flex flex-col w-full cursor-pointer text-white">
    <div
      class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-3 border border-white/5 bg-white/5"
    >
      <img
        :src="posterUrl"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 poster-image"
        loading="lazy"
      />
    </div>

    <div class="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1 flex-wrap">
      <span class="text-[#ff2c55] font-bold">
        {{ rating.toFixed(1) }}
      </span>

      <span>•</span>
      <span>{{ type }}</span>

      <span>•</span>
      <span class="truncate max-w-[180px]" v-if="genres.length > 0">
        {{ genres.join(', ') }}
      </span>
    </div>

    <h3
      class="text-base font-semibold tracking-tight leading-snug group-hover:text-[#ff2c55] transition-colors truncate"
    >
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '../model/types'

defineProps<IMovie>()
</script>

<style>
.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
