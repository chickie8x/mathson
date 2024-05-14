<template>
  <div class="w-full h-[calc(100%-64px)] flex items-center flex-col overflow-auto">
    <div v-if="isLoading" class="flex items-center h-full">
      <div class="bg-indigo-500 rounded-md px-4 py-2 flex items-center text-white">
        <LoadingIcon />
        <span>Đang xử lý....</span>
      </div>
    </div>
    <div v-else class="w-[1152px] h-full">
      <div v-for="(item, idx) in comps" :key="idx">
        <component :is="item" />
      </div>
      <div class="w-[1152px] p-4 flex justify-center">
        <button @click="trigger" class="px-4 py-1 bg-blue-500 text-white rounded-md">
          Hoàn thành
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, ref, provide, shallowRef } from 'vue'
import LoadingIcon from '@/assets/loading.vue'

export default {
  name: 'SelectedOperator',

  components: {
    LoadingIcon
  },

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
