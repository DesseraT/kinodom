<script setup lang="ts">
import { Navbar } from '@/widgets/navbar/index'
import { Footer } from '@/widgets/footer/index'
import { Advantages } from '@/widgets/advantages'
</script>

<template>
  <div class="page">
    <Navbar />
    <Advantages />
    <Footer />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
}
</style>
