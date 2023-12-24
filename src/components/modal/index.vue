<template>
  <div
    v-if="showModal"
    class="fixed top-0 left-0 flex justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm h-screen w-full"
    key="12123"
  >
    <div class="w-[1024px] h-full bg-white overflow-auto fixed top-0 left-[100%-512px] shadow-md">
      <div class="flex items-center justify-center sticky top-0 left-0 bg-blue-500 p-4">
        <span class="block text-center text-xl text-white mx-auto">Luyện tập</span>
        <span class="mx-4 text-white font-bold">{{ minnute }} : {{ seconds }}</span>
        <button @click="selfClose" class="w-8 h-8 text-red-600 flex items-center justify-center">
          Đóng
        </button>
      </div>
      <div class="flex justify-center p-6">
        <div class="grid grid-cols-5 auto-rows-auto w-full">
          <div
            v-for="(item, idx) in data"
            :key="idx"
            class="min-w-[140px] mb-4 mx-auto"
            :tabindex="idx"
            @focus="console.log('focus div')"
          >
            <span class="select-none">{{ item.strShow }}</span>
            <input
              type="number"
              :id="idx"
              v-model="resultRef[idx]"
              :disabled="isCheckedResult"
              :class="[
                isCheckedResult && resultRef[idx] === item.result
                  ? 'bg-green-300 text-green-600 border border-green-600'
                  : '',
                isCheckedResult && resultRef[idx] !== item.result
                  ? 'bg-red-300 text-red-600 border border-red-600'
                  : ''
              ]"
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-blue-300 rounded-sm max-w-[48px] outline-blue-500 px-2"
            />
          </div>
        </div>
      </div>
      <div class="sticky bottom-0 right-0">
        <button @click="resultView" class="px-4 py-2 bg-blue-500 text-white rounded-md mr-auto">
          Xem kết quả
        </button>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'ModalExercise',

  props: {
    showModal: {
      require: true,
      type: Boolean,
      default: () => false
    },

    data: {
      require: true,
      type: Array,
      default: () => []
    },
    time: {
      type: Number,
      require: true,
      default: () => 900
    }
  },

  setup(props, { emit }) {
    const isCheckedResult = ref(false)
    const countdown = ref(props.time)

    const resultRef = computed(() => {
      const size = props.data.length
      let arr = new Array(size).fill(null)
      return arr
    })

    const resultView = () => {
      countdown.value = 0
      isCheckedResult.value = true
    }

    const minnute = computed(() => {
      return Math.floor(countdown.value / 60) >= 10
        ? Math.floor(countdown.value / 60)
        : `0${Math.floor(countdown.value / 60)}`
    })

    const seconds = computed(() => {
      return countdown.value % 60 >= 10 ? countdown.value % 60 : `0${countdown.value % 60}`
    })

    setInterval(() => {
      if (countdown.value > 0) {
        countdown.value -= 1
      }
    }, 1000)

    const resetTimer = () => {
      countdown.value = props.time
    }

    const selfClose = () => {
      isCheckedResult.value = false
      countdown.value = 0
      emit('closeModal')
    }

    return {
      selfClose,
      resultView,
      minnute,
      seconds,
      resultRef,
      isCheckedResult,
      resetTimer
    }
  }
}
</script>
