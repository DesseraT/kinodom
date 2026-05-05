import { createRouter, createWebHistory } from 'vue-router';
import {MainPage} from '@/pages/main/index';
import {LoginPage} from '@/pages/login/index';
import {AboutPage} from '@/pages/about/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: MainPage},
    {path: '/login', component: LoginPage},
    {path: '/about', component: AboutPage},

  ],
})

export default router
