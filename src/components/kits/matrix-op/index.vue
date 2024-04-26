<template>
  <div class="bg-white shadow-md rounded-md mt-8 p-4">
    <span class="font-semibold"
      ><span class="font-bold text-blue-700">Yêu cầu: </span> Điền số thích hợp vào chỗ trống để các
      hàng và cột của bảng số có tổng bằng {{ n }}</span
    >
    <div class="grid grid-cols-4 gap-8 mt-4 pl-8">
      <div v-for="(item, idx) in matrix" :key="idx">
        <MatrixUnit :matrix="item" :sum="n" />
      </div>
    </div>
  </div>
</template>

<script>
import { generateMatrix } from '@/data'
import MatrixUnit from '@/components/units/matrix/index.vue'

export default {
  name: 'MatrixComponent',

  desc: {
    name: 'Ma trận số',
    detail:
      'Điền các sô thích hợp vào ô trống sao cho các hàng và các cột có tổng bằng nhau và bằng số cho trước'
  },

  components: {
    MatrixUnit
  },

  setup() {
    const retSum = () => {
      let num = undefined
      while (!num) {
        let n = Math.floor(Math.random() * 10)
        if (n >= 6 && n <= 9) {
          num = n
        }
      }
      return num
    }
    const n = retSum()
    const matrix = generateMatrix(n)

    return {
      matrix,
      n
    }
  }
}
</script>
