<template>
  <div class="relative w-full">
    <div class="w-[1024px] bg-indigo-100 shadow-sm mx-auto mt-4 p-4 rounded-md">
      <div class="flex space-x-4 flex-wrap">
        <BaseOperator ref="baseop" />
        <CompareNums ref="compnums" />
        <SortNums ref="sortnums" />
      </div>
      <div>
        <ModalExercise
          :showModal="isDisplay"
          :data="dataCreate"
          @closeModal="closeModal"
          :time="time"
          ref="exmodal"
        />
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <button @click="trigger" class="px-8 py-2 bg-blue-500 text-white rounded-md">click</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ModalExercise from '@/components/modal/template1/index.vue'
import BaseOperator from '@/components/exercise-type/base-operator/index.vue'
import CompareNums from '@/components/exercise-type/compare/index.vue'
import SortNums from '@/components/exercise-type/sort/index.vue'

export default {
  name: 'App',

  components: {
    ModalExercise,
    BaseOperator,
    CompareNums,
    SortNums
  },
  setup() {
    const dataCreate = ref([])
    const isDisplay = ref(false)
    let time = 1800
    const exmodal = ref(null)
    const sortnums = ref(null)

    const closeModal = () => {
      dataCreate.value = []
      isDisplay.value = false
      baseop.value.flushData()
    }
    const baseop = ref(null)
    const trigger = () => {
      time = 1800
      dataCreate.value = baseop.value.parentTrigger()
      isDisplay.value = true
      exmodal.value.resetTimer()
      sortnums.value.trigger()
    }

    return {
      dataCreate,
      isDisplay,
      closeModal,
      baseop,
      trigger,
      time,
      exmodal,
      sortnums
    }
  }
}
</script>
