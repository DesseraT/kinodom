<template>
  <section class="w-full py-16 px-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 tracking-tight text-white">Скидки на кино</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 justify-items-start">
        <DiscountItem v-for="discount in discounts" v-bind="discount" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { discounts } from '../consts/discounts'
import { DiscountItem } from '@/entities/discountItem/index'
</script>
