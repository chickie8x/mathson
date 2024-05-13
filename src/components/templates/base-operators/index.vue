<template>
  <div class="w-full h-[calc(100%-64px)] flex justify-center">
    <div v-if="isLoadingComponent" class="flex items-center justify-center h-full">
      <div class="bg-indigo-500 rounded-md px-4 py-2 flex items-center text-white">
        <LoadingIcon />
        <span>Đang xử lý...</span>
      </div>
    </div>

    <div v-else v-once class="w-[1152px]">
      <div v-for="(item, idx) in exercisesList.sort()" :key="idx">
        <component :is="item" />
      </div>
      <div class="w-full mt-8 p-4 flex justify-center">
        <button @click="trigger" class="px-4 py-1 bg-blue-500 text-white rounded-md">Hoàn thành</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, provide, ref, shallowRef } from 'vue'
import LoadingIcon from '@/assets/icons/loading.vue'
import componentNames from '@/components/kits/'
import { shuffleArray } from '@/data'

export default {
  name: 'BaseOperator',

  components: {
    LoadingIcon
  },

  setup(_, { emit }) {
    const isLoadingComponent = ref(true)
    const exercisesList = shallowRef([])
    const isTrigger = ref(false)

    let randomList = shuffleArray(componentNames).slice(0, 4)
    const loadComponents = () => {
      Promise.all(
        randomList.map(async (item) => {
          const module = await import(`../../kits/${item}/index.vue`)
          if (module) {
            exercisesList.value.push(module.default)
          }
        })
      )
    }

    const trigger = () => {
      isTrigger.value = true
    }

    provide('trigger', isTrigger)

    onMounted(() => {
      loadComponents()
    })

    setTimeout(() => {
      isLoadingComponent.value = false
    }, 2000)

    return {
      isLoadingComponent,
      LoadingIcon,
      exercisesList,
      isTrigger,
      trigger
    }
  }
}
</script>
