<template>
  <div class="mt-4 bg-white bg-opacity-80 rounded-md shadow-md p-4">
    <span class="font-semibold"
      ><span class="font-bold text-blue-700">Yêu cầu:</span> Hoàn thành các phép tính sau
    </span>
    <div v-if="conf === 'easy'" class="grid grid-cols-4 mt-2 gap-10 pl-8 text-gray-700">
      <div v-for="(item, idx) in dataSet" :key="idx" class="">
        <span> {{ item[0] }} + {{ item[1] }} = </span>
        <input
          v-model="bindNull[idx]"
          :disabled="isCheckResult"
          type="number"
          class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-blue-300 rounded-sm max-w-[40px] outline-blue-500 px-2 hover:bg-blue-100 duration-300"
          :class="[
            isCheckResult && resultSet[idx] === bindNull[idx]
              ? 'bg-green-300 text-green-600 border border-green-600'
              : '',
            isCheckResult && resultSet[idx] !== bindNull[idx]
              ? 'bg-red-300 text-red-600 border border-red-600'
              : ''
          ]"
        />
      </div>
    </div>

    <div v-else class="grid grid-cols-4 gap-10 mt-4 pl-8">
      <div v-for="(item, idx) in dataSet" :key="idx" class="flex flex-col relative">
        <span class="w-8 flex justify-end px-1">{{ item[0] }}</span>
        <span class="absolute top-3 -left-1">+</span>
        <span class="w-8 flex justify-end px-1 border-b border-gray-800">{{ item[1] }}</span>
        <input
          v-model="bindNull[idx]"
          type="number"
          :disabled="isCheckResult"
          class="px-2 w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-blue-300 mt-1 outline-none"
          :class="[
            isCheckResult && resultSet[idx] === bindNull[idx]
              ? 'bg-green-300 text-green-600 border border-green-600'
              : '',
            isCheckResult && resultSet[idx] !== bindNull[idx]
              ? 'bg-red-300 text-red-600 border border-red-600'
              : ''
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted, inject, watchEffect } from 'vue'
import { tenSumOpGen } from '@/data'

export default {
  name: 'TensSumOp',

  desc: {
    name: 'Phép cộng',
    detail: 'Thực hiện các phép cộng trong phạm vi 10-100'
  },

  setup() {
    const route = useRoute()
    const conf = route.params.param
    const dataSet = ref([])
    const resultSet = ref([])
    const bindNull = ref([])
    const triggerListener = inject('trigger')
    const isCheckResult = ref(false)
    watchEffect(() => {
      if (triggerListener.value) {
        isCheckResult.value = true
      }
    })
    const genData = () => {
      const data = tenSumOpGen(14, conf)
      dataSet.value = data
      resultSet.value = data.map((item) => {
        bindNull.value.push(null)
        return item.reduce((prev, curr) => prev + curr, 0)
      })
    }

    onMounted(() => {
      genData()
    })

    return {
      dataSet,
      resultSet,
      bindNull,
      conf,
      isCheckResult
    }
  }
}
</script>
