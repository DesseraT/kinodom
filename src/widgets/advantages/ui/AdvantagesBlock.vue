<template>
  <section class="w-full text-white py-16 px-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 tracking-tight">Преимущества КиноДома</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AdvantageItem
          v-for="item in advantagesList"
          :key="item.label"
          :img="item.img"
          :label="item.label"
          :text="item.text"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { AdvantageItem } from '@/entities/advantageItem/index'
import { advantagesList } from '../consts/advantages'
</script>
