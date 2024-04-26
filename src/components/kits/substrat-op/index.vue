<template>
  <div>
    <div class="mt-4 bg-white bg-opacity-80 rounded-md shadow-md p-4">
      <span class="font-semibold"
        ><span class="font-bold text-blue-700">Yêu cầu:</span> Hoàn thành các phép tính sau (Phạm vi
        10)
      </span>
      <div class="grid grid-cols-4 gap-10 mt-4 pl-4 text-gray-700">
        <div v-for="(item, idx) in dataSetSub" :key="idx" class="flex items-center space-x-2">
          <span class="select-none">{{ item.strShow }}</span>
          <input
            type="number"
            v-model="subResult[idx]"
            class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-blue-300 rounded-sm max-w-[40px] outline-blue-500 px-2 hover:bg-blue-100 duration-300"
            :disabled="isCheckResult"
            :class="[
              isCheckResult && subResult[idx] === item.result
                ? 'bg-green-300 text-green-600 border border-green-600'
                : '',
              isCheckResult && subResult[idx] !== item.result
                ? 'bg-red-300 text-red-600 border border-red-600'
                : ''
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { numSet, generateNums, shuffleArray, mathConfig, opSum } from '@/data'

export default {
  name: 'SubstractOperator',

  desc: {
    name: 'Phép trừ ',
    detail: 'Thực hiện các phép trừ trong phạm vi 10'
  },

  setup() {
    const dataSetSub = ref([])
    const subResult = ref([])
    const route = useRoute()
    const triggerListener = inject('trigger')
    const isCheckResult = ref(false)
    const confMap = {
      easy: 0,
      medium: 1,
      hard: 2
    }
    const conf = mathConfig[confMap[route.params.param]].config
    const dataGenerate = () => {
      const genNums = generateNums(numSet, conf.numsOfElement).filter((item) => {
        return item.reduce((prev, curr) => prev - curr) >= 0
      })

      shuffleArray(genNums).map((item) => {
        if (dataSetSub.value.length < 25) {
          dataSetSub.value.push(opSum(item, 'sub'))
          subResult.value.push(null)
        } else {
          return
        }
      })
    }

    onMounted(() => {
      dataGenerate()
    })

    watchEffect(() => {
      if (triggerListener.value) {
        isCheckResult.value = true
      }
    })

    return {
      dataSetSub,
      subResult,
      isCheckResult
    }
  }
}
</script>
