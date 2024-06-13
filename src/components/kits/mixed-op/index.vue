<template>
  <div class="mt-8 bg-white rounded-md shadow-md p-4 w-[1152px]">
    <span class="font-semibold"
      ><span class="font-bold text-blue-700">Yêu cầu:</span> Hoàn thành các phép tính sau
    </span>
    <div class="grid grid-cols-4 gap-8 mt-4">
      <div
        v-for="(item, idx) in data"
        :key="idx"
        class="flex flex-col items-end mb-2 text-gray-700 relative max-w-[120px]"
      >
        <span class="absolute top-4 right-14 font-semibold scale-110">{{ item.operator }}</span>
        <div
          class="flex flex-col"
          :class="[idx % 3 === 0 && item.operator === '+' ? 'flex-col-reverse' : '']"
        >
          <div v-for="(jtem, jdx) in item.leftExp" :key="jdx">
            <span v-if="jtem" class="mr-1 block text-right"> {{ jtem }} </span>
            <input
              v-else
              v-model="shadowResult[idx]"
              type="number"
              class="w-12 border border-blue-300 rounded-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1 hover:bg-blue-50 focus:border-2 focus:border-blue-500"
              dir="rtl"
              :class="[
                isCheckResult && shadowResult[idx] === item.result
                  ? 'bg-green-300 text-green-600 border border-green-600'
                  : '',
                isCheckResult && shadowResult[idx] !== item.result
                  ? 'bg-red-300 text-red-600 border border-red-600'
                  : ''
              ]"
            />
          </div>
        </div>
        <div class="border-t border-gray-700 w-12 mt-2 text-end mr-1">{{ item.rightExp }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { genMixedData } from '@/data/index'
import { useRoute } from 'vue-router'
import { inject, ref, watchEffect } from 'vue'

export default {
  name: 'MixOperators',
  desc: {
    name: 'Hỗn hợp',
    detail: 'Tổng hợp các phép toán cộng và trừ trong phạm vi 100'
  },

  setup() {
    const isCheckResult = ref(false)
    const triggerListener = inject('trigger')
    const route = useRoute()
    const data = genMixedData(20, route.params.param)
    const shadowResult = new Array(data.length).fill(null)

    watchEffect(() => {
      if (triggerListener.value) {
        isCheckResult.value = true
      }
    })

    return {
      data,
      isCheckResult,
      shadowResult
    }
  }
}
</script>
