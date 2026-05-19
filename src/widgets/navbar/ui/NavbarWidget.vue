<script setup lang="ts">
import { ref } from 'vue'
import { SearchOverlay } from '@/features/search'
import { SearchIcon, Bell, User2Icon } from 'lucide-vue-next'
const isSearchVisible = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-40 grid grid-cols-[auto_1fr_auto] items-center gap-8 py-4 bg-[#0f0b1e] text-white"
  >
    <div
      class="text-2xl font-bold tracking-tighter hover:cursor-pointer"
      @click="$router.push('/')"
    >
      КИНО<span class="text-red-600">ДОМ</span>
    </div>

    <nav class="flex gap-6 text-gray-300 font-medium">
      <router-link to="/about" class="hover:text-white transition-colors">Фильмы</router-link>
      <router-link to="/about" class="hover:text-white transition-colors">Сериалы</router-link>
      <router-link to="/about" class="hover:text-white transition-colors">Подборки</router-link>
    </nav>

    <div class="flex items-center gap-5">
      <button
        class="flex items-center gap-2 hover:text-gray-400 transition-colors"
        @click="isSearchVisible = true"
      >
        <span><SearchIcon :size="20" /></span> Поиск
      </button>
      <button class="hover:text-gray-400"><Bell /></button>
      <div
        class="w-10 h-10 border border-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-800 cursor-pointer transition-all"
      >
        <User2Icon />
      </div>
    </div>
  </header>
  <SearchOverlay v-if="isSearchVisible" @close="isSearchVisible = false" />
</template>
