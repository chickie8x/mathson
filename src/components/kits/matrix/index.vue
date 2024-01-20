<template>
  <div>
    <div v-for="(item, idx) in incompleteMatrix" :key="idx" class="w-36 flex">
      <div v-for="(jtem, jdx) in item" :key="jdx" class="w-36 h-12 flex">
        <div class="w-12 h-12 flex items-center justify-center border border-blue-200 border-collapse" :class="[jtem===null?'bg-blue-100':'']">
          <input
            type="text"
            class="w-full h-full border-none outline-none bg-transparent text-center"
            v-model="incompleteMatrix[idx][jdx]"
            :disabled="jtem !== null"
            
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { shuffleArray } from '@/data'
export default {
  name: 'MatrixComponent',
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
    const incompleteMatrix = computed(() => {
      let ret = [[...props.matrix[0]], [...props.matrix[1]], [...props.matrix[2]]]
      let idx = shuffleArray([0, 1, 2])
      for (let i = 0; i < ret.length; i++) {
        ret[i][idx[i]] = null
      }
      return ret
    })

    return {
      incompleteMatrix
    }
  }
}
</script>
