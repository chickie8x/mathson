<template>
  <div class="w-full flex items-center flex-col">
    <div v-if="isLoading">loading....</div>
    <div v-else class="w-[1152px]">
      <div v-for="(item, idx) in comps" :key="idx">
        <component :is="item" />
      </div>
    </div>

    <div class="w-[1152px] mt-8 p-4">
      <button @click="trigger" class="px-4 py-1 bg-blue-500 text-white rounded-md">CHECK</button>
    </div>
  </div>
</template>

<script>
import componentNames from '@/components/kits'
import { useRoute } from 'vue-router'
import { onMounted, ref, provide, shallowRef } from 'vue'

export default {
  name: 'SelectedOperator',

  setup() {
    const isLoading = ref(true)
    const route = useRoute()
    const choices = route.params.choices.split('&')
    const selectedComponents = choices.map((item) => {
      return item
    })

    const comps = shallowRef([])
    const isTrigger = ref(false)
    const trigger = () => {
      isTrigger.value = true
    }

    provide('trigger', isTrigger)

    const loadComponents = () => {
      Promise.all(
        selectedComponents.map(async (item) => {
          const module = await import(`../../kits/${item}/index.vue`)
          if (module) {
            comps.value.push(module.default)
          }
        })
      )
    }

    onMounted(() => {
      loadComponents()
    })

    setTimeout(() => {
      isLoading.value = false
    }, 2000)

    return {
      comps,
      trigger,
      isLoading
    }
  }
}
</script>
