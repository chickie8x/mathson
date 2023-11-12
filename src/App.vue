<template>
  <div class="relative w-full">
    <div class="w-[1024px] bg-indigo-100 shadow-sm mx-auto mt-4 p-4 rounded-md">
      <div>
        <BaseOperator />
      </div>
      <div>
        <ModalExercise :showModal="isDisplay" :data="dataCreate" @selfClose="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ModalExercise from '@/components/modal/index.vue'
import BaseOperator from '@/components/exercise-type/base-operator/index.vue'
import CompareNums from '@/components/exercise-type/compare/index.vue'

export default {
  name: 'App',

  components: {
    ModalExercise,
    BaseOperator,
    CompareNums
  },
  setup() {
    const dataCreate = ref([])
    const isDisplay = ref(false)
    const closeModal = () => {}

    return {
      dataCreate,
      isDisplay,
      closeModal
    }
  }
}
</script>
