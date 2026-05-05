<template>
  <div class="flex flex-col items-start gap-3">
    <img
      class="w-16 h-16 rounded-full bg-[#1c182a] flex items-center justify-center mb-1 text-4xl shadow-[0_0_20px_1px_rgba(33,180,253,0.3)] border border-[#232034]"
      :src="img"
      v-if="img"
    />
    <h3 class="text-xl font-semibold tracking-tight mt-2">{{ label }}</h3>
    <p class="text-sm text-gray-400 leading-relaxed max-w-[280px]">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  img: String,
  label: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>
