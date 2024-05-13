<template>
  <div
    class="relative w-full min-h-screen bg-blue-50"
  >
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import ModalExercise from '@/components/modal/template1/index.vue'
import AnimalsFlashCard from '@/components/modal/template2/index.vue'
import NavBar from '@/components/navbar/index.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',

  components: {
    ModalExercise,
    AnimalsFlashCard,
    NavBar
  },
  setup() {
    const route = useRoute()

    return {
      route,
    }
  }
}
</script>
