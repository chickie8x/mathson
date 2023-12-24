<template>
  <div>
    <div class="mt-4">
      <span class="text-xl"
        ><span class="font-bold text-blue-700">Bài 1:</span> Hoàn thành các phép tính sau
      </span>
      <div class="grid grid-cols-5 row-auto mt-2 gap-4 pl-8">
        <div v-for="(item, idx) in data" :key="idx" class="flex items-center space-x-2">
          <span class="select-none">{{ item.strShow }}</span>
          <input
            type="number"
            v-model="result[idx]"
            class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-blue-300 rounded-sm max-w-[40px] outline-blue-500 px-2 hover:bg-blue-100 duration-300"
            :disabled="isCheckedResult"
            :class="[
              isCheckedResult && result[idx] === item.result
                ? 'bg-green-300 text-green-600 border border-green-600'
                : '',
              isCheckedResult && result[idx] !== item.result
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
import { ref } from 'vue'

export default {
  name: 'SumComponent',

  props: {
    data: {
      type: Array,
      require: true,
      default: () => []
    },

    resultSet: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  setup(props) {
    const result = ref(props.resultSet)
    const isCheckedResult = ref(false)

    const trigger = () => {
      isCheckedResult.value = true
    }

    return {
      result,
      isCheckedResult,
      trigger
    }
  }
}
</script>
