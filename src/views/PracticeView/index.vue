<template>
  <div class="h-[calc(100%-64px)]">
    <div class="mx-auto max-w-7xl px-2 py-1 sm:py-6 sm:px-6 lg:px-8 lg:py-8 font-Nunito">
      <span class="text-2xl text-indigo-600 font-bold">Bài tập ngẫu nhiên</span>
      <div class="w-full py-4 rounded-md grid grid-cols-3 row-auto mt-4 gap-4">
        <div v-for="(item, idx) in lessonType" :key="idx">
          <LessonType
            :animation="item.animation"
            :sectionTitle="item.sectionTitle"
            :tag="item.tag"
            :difficulty="item.difficulty"
            :pathName="item.pathName"
          />
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-2 py-1 sm:py-6 sm:px-6 lg:px-8 lg:py-8 font-Nunito">
      <span class="text-2xl text-indigo-600 font-bold">Tuỳ chọn dạng bài tập</span>
      <div class="w-full py-4 rounded-md mt-4 gap-y-10 grid grid-cols-3 gap-10">
        <div
          v-for="(item, idx) in exercisesList"
          :key="idx"
          class="flex flex-col w-full p-2 bg-white shadow-md rounded-md"
        >
          <div class="flex items-center justify-between">
            <span class="text-blue-500 font-medium capitalize">{{ item.desc.name }}</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="selectedExerciseInit[idx]" class="sr-only peer" />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
            </label>
          </div>
          <span class="mt-4">{{ item.desc.detail }}</span>
        </div>
      </div>
      <div class="flex items-end space-x-4">
        <div>
          <span class="block font-semibold text-sm mb-2">Chọn độ khó</span>
          <select name="sld" id="sld" v-model="selectOpDiff" class="px-2 py-1 text-sm outline-none border border-gray-200 rounded-md">
            <option v-for="item, idx in sl" :key="idx" :value="item">{{ item.text }}</option>
          </select>
        </div>
        <button
          @click="goToPractice"
          :disabled="paramPassed === ''"
          class="border-none, px-4 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:text-gray-600"
        >
          Bắt đầu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import LessonType from './LessonType/index.vue'
import { lessonType } from './lessons.js'
import componentNames from '@/components/kits/'
import { useRouter } from 'vue-router'

export default {
  name: 'PracticeView',

  components: {
    LessonType
  },

  setup() {
    const router = useRouter()
    const exercisesList = ref([])
    const asyncList = ref([])
    const sl = [
      {
        id: 0,
        text: 'Dễ',
        value: 'easy'
      },

      {
        id: 1,
        text: 'Trung bình',
        value: 'medium'
      },

      {
        id: 0,
        text: 'Khó',
        value: 'hard'
      },
    ]
    const selectOpDiff = ref(sl[0])
    const loadComponents = () => {
      Promise.all(
        componentNames.map(async (item) => {
          const module = await import(`../../components/kits/${item}/index.vue`)
          if (module) {
            exercisesList.value.push(module.default)
            asyncList.value.push(item)
          }
        })
      )
    }
    const selectedExerciseInit = ref(new Array(componentNames.length).fill(false))
    const selectedExercise = computed(() => {
      let ret = []
      selectedExerciseInit.value.map((item, idx) => {
        if (item) {
          ret.push(asyncList.value[idx])
        }
      })
      return ret
    })

    const paramPassed = computed(() => {
      return selectedExercise.value.join('&')
    })

    const goToPractice = () => {
      router.push({ name: 'choices', params: { choices: paramPassed.value, param: selectOpDiff.value.value } })
    }

    onMounted(() => {
      loadComponents()
    })

    return {
      lessonType,
      exercisesList,
      selectedExerciseInit,
      selectedExercise,
      paramPassed,
      goToPractice,
      sl,
      selectOpDiff
    }
  }
}
</script>
