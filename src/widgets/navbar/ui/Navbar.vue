<script setup lang="ts"></script>

<template>
  <header
    className="grid grid-cols-[auto_1fr_auto] items-center gap-8 py-4 bg-[#0f0b1e] text-white"
  >
    <div className="text-2xl font-bold tracking-tighter hover:cursor-pointer">
      КИНО<span className="text-red-600">ДОМ</span>
    </div>

    <nav className="flex gap-6 text-gray-300 font-medium">
      <router-link to="/about" className="hover:text-white transition-colors">Фильмы</router-link>
      <router-link to="/about" className="hover:text-white transition-colors">Сериалы</router-link>
      <router-link to="/about" className="hover:text-white transition-colors">Подборки</router-link>
    </nav>

    <div className="flex items-center gap-5">
      <button className="flex items-center gap-2 hover:text-gray-400 transition-colors">
        <span>🔍</span> Поиск
      </button>
      <button className="hover:text-gray-400">🔔</button>
      <div
        className="w-10 h-10 border border-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-800 cursor-pointer transition-all"
      >
        👤
      </div>
    </div>
  </header>
</template>
