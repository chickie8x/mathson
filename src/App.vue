<template>
  <div
    class="relative w-full h-screen bg-blue-50"
    :class="[disableScroll ? 'overflow-hidden' : 'overflow-auto']"
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
import { watch, ref, computed } from 'vue'
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
    const disableScroll = ref(false)
    const path = computed(() => {
      return route.path
    })
    watch(path, () => {
      disableScroll.value = true
      setTimeout(() => {
        disableScroll.value = false
      }, 1000)
    })

    return {
      route,
      disableScroll
    }
  }
}
</script>
