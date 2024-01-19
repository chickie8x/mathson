<template>
  <div>
    <div class="mt-8 bg-white bg-opacity-80 rounded-md shadow-md p-4">
      <span class="text-xl"
        ><span class="font-bold text-blue-700">Yêu cầu: </span> Sắp xếp các dãy số sau theo thứ tự
        {{ sortType === 'increase' ? 'tăng' : 'giảm' }} dần</span
      >
      <div class="mt-4 pl-8 grid grid-cols-2 row-auto">
        <div v-for="(item, idx) in data" :key="idx" class="space-x-6 flex items-center w-fit mb-4">
          <span>{{ item.strExp }}</span>
          <div class="flex items-center space-x-4 mb-2">
            <input
              v-for="(itemsub, idxsub) in item.sortedRet"
              :key="idxsub"
              v-model="result[idx][idxsub]"
              type="number"
              class="w-8 px-2 py-1 border border-blue-300 focus:outline-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              :disabled="isCheckedResult"
              :class="[
                isCheckedResult && result[idx][idxsub] === itemsub
                  ? 'bg-green-300 text-green-600 border border-green-600'
                  : '',
                isCheckedResult && result[idx][idxsub] !== itemsub
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
import { ref } from 'vue'
export default {
  name: 'SortComponent',

  props: {
    data: {
      type: Array,
      require: true,
      default: () => {
        ;[]
      }
    },

    resultSet: {
      type: Array,
      require: true,
      default: () => {
        ;[]
      }
    },

    sortType: {
      type: String,
      require: true,
      default: () => 'increase'
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
