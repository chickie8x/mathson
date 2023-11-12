<template>
  <div
    v-if="showModal"
    class="fixed top-0 left-0 flex justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm h-screen w-full"
  >
    <div class="w-[1024px] h-full bg-white p-4">
      <div class="flex items-center justify-center relative">
        <span class="block text-center text-xl text-green-700">Đề bài</span>
        <button
          @click="selfClose"
          class="w-8 h-8 text-red-600 flex items-center justify-center absolute top-0 right-0"
        >
          Đóng
        </button>
      </div>
      <div class="flex justify-center p-6">
        <div class="flex justify-center flex-wrap">
          <div v-for="(item, idx) in data" :key="idx" class="min-w-[140px] mb-4">
            <span>{{ item[0] }} + {{ item[1] }} = .....</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },

  setup(_, { emit }) {
    const selfClose = () => {
      emit('selfClose')
    }

    return {
      selfClose
    }
  }
}
</script>
