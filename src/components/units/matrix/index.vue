<template>
  <div>
    <div
      class="w-fit"
      :class="[
        isCheckResult && result ? 'border-2 border-green-500 bg-green-200 text-green-800' : '',
        isCheckResult && !result ? 'border-2 border-red-500 bg-red-200 text-red-800' : ''
      ]"
    >
      <div v-for="(item, idx) in incompleteMatrix" :key="idx" class="w-36 flex text-gray-700">
        <div v-for="(jtem, jdx) in item" :key="jdx" class="w-36 h-12 flex">
          <div
            class="w-12 h-12 flex items-center justify-center border border-blue-200 border-collapse"
            :class="[jtem === null ? 'bg-blue-100' : '']"
          >
            <input
              type="number"
              class="w-full h-full border-none outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              v-model="incompleteMatrix[idx][jdx]"
              :disabled="jtem !== null"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shuffleArray } from '@/data/index'
import { computed, inject, ref, watchEffect } from 'vue'

export default {
  name: 'MatrixUnit',

  props: {
    matrix: {
      type: Array,
      require: true,
      default: () => []
    },

    sum: {
      type: Number,
      require: true,
      default: () => 9
    }
  },

  setup(props) {
    const isCheckResult = ref(false)
    const result = ref(false)
    const incompleteMatrix = computed(() => {
      let ret = [[...props.matrix[0]], [...props.matrix[1]], [...props.matrix[2]]]
      let idx = shuffleArray([0, 1, 2])
      for (let i = 0; i < ret.length; i++) {
        ret[i][idx[i]] = null
      }
      return ret
    })

    const triggerListener = inject('trigger')

    const checkResult = () => {
      isCheckResult.value = true
      for (let i = 0; i < props.matrix.length; i++) {
        for (let j = 0; j < props.matrix.length; j++) {
          if (props.matrix[i][j] !== incompleteMatrix.value[i][j]) {
            result.value = false
            return
          }
        }
      }
      result.value = true
      return
    }

    watchEffect(() => {
      if (triggerListener.value) {
        isCheckResult.value = true
        checkResult()
      }
    })

    return {
      incompleteMatrix,
      isCheckResult,
      result
    }
  }
}
</script>
