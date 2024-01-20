<template>
  <div class="w-[1152px] mx-auto">
    <div class="mt-8">
      <span class="text-xl"
        ><span class="text-blue-700 font-Nunito font-bold">Yêu cầu: </span>Điền số thích hợp vào các
        ô trống sao cho tổng các hàng và cột đều bằng {{ retSum }}</span
      >
      <div class="grid grid-cols-4 row-auto gap-12 mt-8">
        <div v-for="(item, idx) in matrix" :key="idx">
          <MatrixComponent :matrix="item" :sum="retSum" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateMatrix } from '@/data/index'
import MatrixComponent from '@/components/kits/matrix/index.vue'

export default {
  name: 'LogicView',

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
