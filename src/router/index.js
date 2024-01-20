import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import PracticeView from '../views/PracticeView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/practice',
      name: 'practice',
      component: PracticeView,
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/practice/baseop/:param',
      name: 'baseop',
      component: () => import('@/components/modal/template1/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/practice/flashcard/:param',
      name: 'flashcard',
      component: () => import('../components/modal/template2/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../views/RankView/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/FeedbackView/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/practice/logic',
      name: 'logic',
      component: () => import('../components/modal/template3/index.vue'),
      meta: {
        transition: 'fade'
      }
    }
  ]
})

export default router
