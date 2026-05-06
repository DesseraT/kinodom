<template>
  <button
    class="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
    :class="{
      'bg-[#e50914] hover:bg-[#ff0d1a] text-white': type === 'primary',
      'border border-white/20 hover:border-white/60 hover:bg-white/5 text-white':
        type === 'outline',
    }"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import type { IBtnProps } from '../model/types'
defineProps<IBtnProps>()
</script>
