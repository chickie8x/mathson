import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import PracticeView from '../views/PracticeView/index.vue'
import { user } from '@/firebase'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        transition: 'fade',
        authMessage: false
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
      component: () => import('@/components/templates/base-operators/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/practice/flashcard/:param',
      name: 'flashcard',
      component: () => import('../components/templates/template2/index.vue'),
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
      component: () => import('../components/templates/template3/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/practice/baseop/:param/choices/:choices',
      name: 'choices',
      component: () => import('../components/templates/selected-operators/index.vue'),
      meta: {
        transition: 'fade'
      }
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/LoginView/index.vue'),
      meta: {
        transition: 'fade'
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (user.value && to.path === '/' && from.path === '/auth') {
    to.meta.authMessage = true
  }
  else{
    to.meta.authMessage = false
  }
  next()

})

export default router
