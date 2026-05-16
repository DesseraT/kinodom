<script setup lang="ts">
import type { IMovieProps } from '@/shared/api/convertApi'
import { MyBtn } from '@/shared/btn'
import { Play,Ticket,Heart } from 'lucide-vue-next';
import { computed } from 'vue';
import {MovieList} from '@/features/movieList'
import type { IMovie } from '@/entities/movieItem';
const props = defineProps<{
  info: IMovieProps,
  recommendedMovies: IMovie[]
}>();
const formattedDate =  computed(() => {
  return props.info.release_date.split('-').reverse().join('-')
});

const formattedRuntime = computed(() => {
  const hours = Math.floor(props.info.runtime / 60);
  const minutes = props.info.runtime % 60;
  return `${hours} ч ${minutes} мин`;
});

const formatCurrency = (value: number) => {
  if (!value) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};
</script>

<template>
  <div class="min-h-screen bg-[#0f0b1e] text-white">
    <section class="relative h-[650px] w-full overflow-hidden">
      <img
        :src="`https://image.tmdb.org/t/p/original${info.backdrop_path}`"
        class="absolute inset-0 h-full w-full object-cover object-top rounded-xl"
        alt="backdrop"
      />

      <div
        class="absolute inset-0 bg-gradient-to-r from-[#0f0b1e] via-[#0f0b1e]/40 to-transparent"
      ></div>
      <div class="absolute inset-0 bg-black/20"></div>

      <div
        class="relative z-10 container mx-auto px-6 md:px-20 h-full flex flex-col justify-center"
      >
        <div class="max-w-2xl">
          <h1 class="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            {{ info.title }}
          </h1>
          <div class="flex items-center gap-3 text-zinc-300 mb-8 font-medium">
            <span class="text-red-600 font-bold">{{ info.vote_average.toFixed(1) }}</span>
            <span>•</span>
            <span class="text-nowrap">{{ formattedDate }}</span>
            <span>•</span>
            <span >{{ info.genres.map((g) => g.name).join(', ') }}</span>
            <span>•</span>
            <span class="text-nowrap">{{ formattedRuntime }}</span>
          </div>
          <div class="flex flex-wrap gap-4">
            <MyBtn :type="'primary'" class="w-50 flex items-center justify-center gap-1">Смотреть фильм <Play/></Mybtn>
            <MyBtn :type="'outline'" >Трейлер</Mybtn>
            <MyBtn :type="'outline'" ><Ticket/></Mybtn>
            <MyBtn :type="'outline'" ><Heart/></Mybtn>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-6 md:px-20 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div class="lg:col-span-2">
          <h2 class="text-3xl font-bold mb-8">О фильме</h2>
          <p class="text-zinc-400 leading-relaxed text-lg mb-12">
            {{ info.overview || 'Описание отсутствует.' }}
          </p>

          <div class="border-t border-zinc-800 pt-12">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-3xl font-bold">
                Рецензии <span class="text-zinc-600 text-xl ml-2">Написать рецензию</span>
              </h2>
            </div>
            <div class="bg-white/5 rounded-2xl p-6 border border-white/5 italic text-zinc-500">
              Тут будет ваше непременно важное мнение...
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-y-4 text-sm">
            <div class="text-zinc-500">Статус</div>
            <div class="text-zinc-300">{{ info.status }}</div>

            <div class="text-zinc-500">Бюджет</div>
            <div class="text-zinc-300">{{ formatCurrency(info.budget) }}</div>

            <div class="text-zinc-500">Сборы</div>
            <div class="text-zinc-300">{{ formatCurrency(info.revenue) }}</div>

            <div class="text-zinc-500">Жанр</div>
            <div class="text-zinc-300">{{ info.genres.map((g) => g.name).join(', ') }}</div>

            <div class="text-zinc-500">Слоган</div>
            <div class="text-zinc-300 italic">{{ info.tagline || '-' }}</div>
          </div>

          <div class="pt-6 border-t border-zinc-800">
            <div class="flex items-center justify-between">
              <span class="text-zinc-500">Рейтинг TMDB</span>
              <span class="font-bold text-red-600">{{ info.vote_average.toFixed(1) }}</span>
            </div>
          </div>
        </div>
      </div>
      <MovieList v-if="recommendedMovies?.length > 0" :title="'Похожее'" :movies="recommendedMovies"/>
    </section>
  </div>
</template>
