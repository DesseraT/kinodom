<template>
  <section class="w-full py-16 px-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 tracking-tight text-white">Тарифные планы</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <PricingItem
          v-for="tariff in tariffs"
          :key="tariff.title"
          :title="tariff.title"
          :price="tariff.price"
          :benefits="tariff.benefits"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PricingItem } from '@/entities/pricingItem/index.ts'
import { tariffs } from '../consts/pricing'
</script>
