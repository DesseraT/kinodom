import { createRouter, createWebHistory } from 'vue-router'
import { MainPage } from '@/pages/main/index'
import { LoginPage } from '@/pages/login/index'
import { AboutPage } from '@/pages/about/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/about/:movieId',
      name: 'movie-details',
      component: AboutPage,
      props: true,
    },
    // {
    //   path: '/serials/:serialId/episode/:episodeNum',
    //   name: 'serial-details',
    //   component: AboutPage,
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: 'main' },
    },
  ],
})

export default router
