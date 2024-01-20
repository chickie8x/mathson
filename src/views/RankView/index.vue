<template>
  <div class="grid grid-cols-4 row-auto gap-12">
    <div v-for="(item, idx) in matrix" :key="idx">
      <MatrixComponent :matrix="item" :sum="retSum" />
    </div>
  </div>
</template>

<script>
import { generateMatrix } from '@/data/index'
import MatrixComponent from '@/components/kits/matrix/index.vue'

export default {
  name: 'RankingView',

  components: {
    MatrixComponent
  },

  setup() {
    const retSum = 8
    const matrix = generateMatrix(retSum)

    return {
      matrix,
      retSum
    }
  }
}
</script>
