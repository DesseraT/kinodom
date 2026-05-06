<template>
  <div
    class="w-[320px] p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col h-full text-white"
  >
    <h2 class="text-4xl font-bold mb-8 uppercase tracking-wide">{{ title }}</h2>

    <ul class="flex-grow space-y-5">
      <li
        v-for="item in benefits"
        :key="item.text"
        class="flex items-center gap-3 text-sm font-medium"
        :style="item.isLocked ? 'opacity: 50%' : ''"
      >
        <span v-if="!item.isLocked" class="text-green-500 text-lg">✓</span>
        <span v-else class="text-lg">🔒</span>
        <span>{{ item.text }}</span>
      </li>
    </ul>

    <div class="h-px bg-white/10 my-8 w-full"></div>

    <div class="flex items-center justify-between gap-4">
      <MyBtn :text="'Оформить подписку'" :type="'primary'" />
      <div class="text-2xl font-bold whitespace-nowrap">
        {{ price }}<span class="text-sm ml-1 font-normal text-white/60">₽</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPricingItem } from '../model/types.ts'
import { MyBtn } from '@/shared/btn'
defineProps<IPricingItem>()
</script>
