<template>
  <div class="flex flex-col items-start h-full max-w-[540px] text-white">
    <img
      class="w-16 h-16 rounded-full bg-[#1c182a] flex items-center justify-center mb-6 text-3xl border border-[#232034]"
      :src="icon"
      loading="lazy"
    />

    <div class="flex-grow space-y-4 mb-8">
      <h3 class="text-2xl font-semibold tracking-tight">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-400 leading-relaxed">
        {{ description }}
      </p>
      <p v-if="subDescription" class="text-xs text-gray-500 leading-relaxed pt-1">
        {{ subDescription }}
      </p>
    </div>
    <MyBtn :type="btn.type">{{ btn.text }}</MyBtn>
  </div>
</template>

<script setup lang="ts">
import type { IDiscountItem } from '../model/types.ts'
import { MyBtn } from '@/shared/btn/'
defineProps<IDiscountItem>()
</script>
