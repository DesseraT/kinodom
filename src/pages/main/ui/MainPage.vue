<script setup lang="ts">
import { Navbar } from '@/widgets/navbar/index'
import { Footer } from '@/widgets/footer/index'
import { Advantages } from '@/widgets/advantages/index'
import { PricingBlock } from '@/widgets/pricing/index'
</script>

<template>
  <div class="page">
    <Navbar />
    <Advantages />
    <PricingBlock />
    <Footer />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
}
</style>
