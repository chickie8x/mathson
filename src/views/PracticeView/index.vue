<template>
  <div class="h-[calc(100%-64px)]">
    <div class="mx-auto max-w-7xl h-full px-2 py-1 sm:py-6 sm:px-6 lg:px-8 lg:py-8 font-Nunito">
      <span class=" text-2xl text-indigo-600 font-bold">Chọn dạng bài tập</span>
      <ul class="w-full bg-gray-100 p-4 rounded-md shadow-md grid grid-cols-3 row-auto mt-4">
        <li class="flex px-2 rounded-md shadow-sm bg-white ">
          <Vue3Lottie
            :animationData="mathAnimation"
            :noMargin="true"
            width="160px"
            height="160px"
            role="button"
            :speed="0.4"
          />
          <div class="p-4 flex flex-col justify-between">
            <span class="text-indigo-500 font-semibold select-none">Phép toán cơ sở</span>
            <select name="math-difficulty" id="math-difficulty" v-model="conf" class="outline-none bg-blue-500 text-white py-1 shadow-sm rounded-md">
              <option v-for="item, idx in mathConfig" :key="idx" :value="item.value">{{ item.text }}</option>
            </select>
            <div>
              <button @click="startLesson" class="px-4 py-1 bg-blue-500 text-center rounded-md text-white shadow-md">Bắt đầu</button>
            </div>
            <div>

            </div>
          </div>
        </li>
      </ul>
    </div>  
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import mathAnimation from '@/assets/lottiefiles/math.json'
import { mathConfig } from '@/data/index'
import { ref } from 'vue'
import { useRoute, useRouter} from 'vue-router'

export default {
  name: 'PracticeView',

  components: {
    Vue3Lottie
  },

  setup() {
    const conf  = ref(mathConfig.easy.value)
    const route = useRoute()
    const router = useRouter()

    const startLesson = () => {
      router.push({name: 'baseop', params: {difficulty: conf.value}})
    }
    
    return {
      mathAnimation,
      mathConfig,
      conf,
      startLesson
    }
  }
}
</script>
