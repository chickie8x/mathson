<template>
  <div class="grid grid-cols-4 row-auto gap-12"></div>
</template>

<script>
import { generateMatrix } from '@/data/index'

export default {
  name: 'RankingView',

  components: {
    MatrixComponent
  },

  setup() {
    return {}
  }
}
</script>
