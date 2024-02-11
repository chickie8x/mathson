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

    <div class="mt-8 mb-4">
      <span class="text-xl"
        ><span class="text-blue-700 font-Nunito font-bold">Yêu cầu: </span>Điền số thích hợp vào các
        ô trống</span
      >
      <div class="mt-4 grid grid-cols-2 gap-y-8">
        <div v-for="item, idx in numListArray" :key="idx">
          <ComponentFill :data="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateMatrix, numListGenerate } from '@/data/index'
import MatrixComponent from '@/components/kits/matrix/index.vue'
import ComponentFill from '@/components/kits/fill/index.vue'

export default {
  name: 'LogicView',

  components: {
    MatrixComponent,
    ComponentFill
  },

  setup() {
    const retSum = 8
    const matrix = generateMatrix(retSum)
    const numListArray = numListGenerate()

    return {
      matrix,
      retSum,
      numListArray
    }
  }
}
</script>
