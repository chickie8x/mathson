<template>
  <div class="flex flex-col space-y-12">
    <div v-for="item, idx in matrix" :key="idx">
        <MatrixComponent :matrix="item"/>
    </div>
  </div>
</template>

<script>
import { generateMatrix } from '@/data/index';
import MatrixComponent from '@/components/kits/matrix/index.vue'

export default {
  name: 'RankingView',

  components:{
    MatrixComponent
  },

  setup(){
    const matrix = generateMatrix(8)

    return {
      matrix
    }
  }
}
</script>
