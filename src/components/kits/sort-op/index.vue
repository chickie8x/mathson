<template>
  <div>
    <div class="mt-8 bg-white bg-opacity-80 rounded-md shadow-md p-4">
      <span class="font-semibold"
        ><span class="font-bold text-blue-700">Yêu cầu: </span> Sắp xếp các dãy số sau theo thứ tự
        {{ sortType === 'increase' ? 'tăng' : 'giảm' }} dần</span
      >
      <div class="mt-4 pl-8 grid grid-cols-2 row-auto text-gray-700">
        <div
          v-for="(item, idx) in dataSort"
          :key="idx"
          class="space-x-6 flex items-center w-fit mb-4"
        >
          <span>{{ item.strExp }}</span>
          <div class="flex items-center space-x-4 mb-2">
            <input
              v-for="(itemsub, idxsub) in item.sortedRet"
              :key="idxsub"
              v-model="sortResult[idx][idxsub]"
              type="number"
              class="w-8 px-2 py-1 border border-blue-300 focus:outline-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              :disabled="isCheckResult"
              :class="[
                isCheckResult && sortResult[idx][idxsub] === itemsub
                  ? 'bg-green-300 text-green-600 border border-green-600'
                  : '',
                isCheckResult && sortResult[idx][idxsub] !== itemsub
                  ? 'bg-red-300 text-red-600 border border-red-600'
                  : ''
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import {
  generateNums,
  numSet,
  mathConfig,
  shuffleArray,
  sortNums,
  sortNumsReversed
} from '@/data/index'
import { inject, onMounted, ref, watchEffect } from 'vue'

export default {
  name: 'SortOperator',

  desc: {
    name: 'Sắp xếp dãy số',
    detail: 'Sắp xếp dãy số theo thứ tự từ nhỏ đến lớn hoặc ngược lại'
  },

  setup() {
    const isCheckResult = ref(false)
    const dataSort = ref([])
    const sortResult = ref([])
    const sortType = ref('')
    const route = useRoute()
    const confMap = {
      easy: 0,
      medium: 1,
      hard: 2
    }

    const conf = mathConfig[confMap[route.params.param]].config

    const genData = () => {
      const genSort = generateNums(numSet, conf.sortOperators.sortLength)
      shuffleArray(genSort).map((item) => {
        if (sortType.value === 'increase') {
          if (dataSort.value.length < conf.sortOperators.sortLength) {
            let obj = {}
            obj.strExp = item.join(', ')
            obj.sortedRet = sortNums(item)
            dataSort.value.push(obj)
            sortResult.value.push(new Array(item.length).fill(null))
          }
        } else {
          if (dataSort.value.length < conf.sortOperators.sortLength) {
            let obj = {}
            obj.strExp = item.join(', ')
            obj.sortedRet = sortNumsReversed(item)
            dataSort.value.push(obj)
            sortResult.value.push(new Array(item.length).fill(null))
          }
        }
      })
    }

    const genSortType = () => {
      let num = Math.floor(Math.random() * 10)
      if (num % 2 === 0) {
        sortType.value = 'increase'
      } else {
        sortType.value = 'reverse'
      }
    }

    onMounted(() => {
      genSortType()
      genData()
    })

    const triggerListener = inject('trigger')

    watchEffect(() => {
      if (triggerListener.value) {
        isCheckResult.value = true
      }
    })

    return {
      isCheckResult,
      dataSort,
      sortResult,
      sortType
    }
  }
}
</script>
