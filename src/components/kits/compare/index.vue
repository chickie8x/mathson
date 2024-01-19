<template>
  <div>
    <div class="mt-8 bg-white bg-opacity-80 rounded-md shadow-md p-4">
      <span class="text-xl"
        ><span class="font-bold text-blue-700">Yêu cầu: </span> Điền dấu
        <span class="font-bold text-blue-600">> </span>,<span class="font-bold text-blue-600"
          >&lt;
        </span>
        hoặc <span class="font-bold text-blue-600"> =</span> vào ô trống
      </span>
      <div class="grid grid-cols-4 row-auto gap-4 pl-8 mt-4">
        <div
          v-for="(item, idx) in data"
          :key="idx"
          class="space-x-2 flex items-center justify-start"
        >
          <span class="w-24 flex justify-end">{{ item.strExp[0] }}</span>
          <input
            type="text"
            class="max-w-[32px] border border-blue-300 px-2 font-bold focus:outline-blue-300 hover:bg-blue-100 duration-300"
            :disabled="isCheckedResult"
            v-model="result[idx]"
            @keyup="charFilter(idx)"
            :class="[
              isCheckedResult && result[idx] === item.result
                ? 'bg-green-300 text-green-600 border border-green-600'
                : '',
              isCheckedResult && result[idx] !== item.result
                ? 'bg-red-300 text-red-600 border border-red-600'
                : ''
            ]"
          />
          <span class="w-24">{{ item.strExp[1] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'CompareComponent',

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
    const isCheckedResult = ref(false)
    const result = ref(props.resultSet)

    const trigger = () => {
      isCheckedResult.value = true
    }
    const charFilter = (idx) => {
      if (result.value[idx] !== '=' && result.value[idx] !== '>' && result.value[idx] !== '<') {
        result.value[idx] = null
      }
    }

    return {
      isCheckedResult,
      result,
      trigger,
      charFilter
    }
  }
}
</script>
