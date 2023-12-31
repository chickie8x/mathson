<template>
  <div class="h-[calc(100%-64px)]">
    <div class="mx-auto max-w-7xl h-full px-2 py-1 sm:py-6 sm:px-6 lg:px-8 lg:py-8 font-Nunito">
      <span class="text-2xl text-indigo-600 font-bold">Chọn dạng bài tập</span>
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
  </div>
</template>

<script>
import LessonType from './LessonType/index.vue'
import { lessonType } from './lessons.js'

export default {
  name: 'PracticeView',

  components: {
    LessonType
  },

  setup() {
    return {
      lessonType
    }
  }
}
</script>
