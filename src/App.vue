<template>
  <div class="relative w-full h-screen bg-blue-50 overflow-auto">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import AnimalsFlashCard from '@/components/templates/template2/index.vue'
import NavBar from '@/components/navbar/index.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',

  components: {
    AnimalsFlashCard,
    NavBar,
  },
  setup() {
    const route = useRoute()

    return {
      route
    }
  }
}
</script>
