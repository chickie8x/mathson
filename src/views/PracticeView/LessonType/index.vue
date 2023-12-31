<template>
  <div class="p-4 rounded-md shadow-md bg-white bg-opacity-60 font-Nunito justify-evenly flex">
    <Vue3Lottie
      :animationData="animationJson"
      :noMargin="true"
      width="160px"
      height="160px"
      role="button"
      :speed="0.4"
      class="border border-gray-300 rounded-md shadow-sm"
    />

    <div class="flex flex-col justify-between">
      <div>
        <span class="text-blue-500 text-xl font-semibold">{{ sectionTitle }}</span>
        <span
          class="block px-1 text-white text-[12px] rounded-md w-fit"
          :class="[tag === 'active' ? 'bg-green-500' : 'bg-orange-400']"
          >{{ tag }}</span
        >
      </div>
      <select
        :name="pathName"
        :id="pathName"
        v-model="configValue"
        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none font-semibold"
        v-if="difficulty"
      >
        <option v-for="(item, idx) in conf" :key="idx" :value="item.value">
          {{ item.text }}
        </option>
      </select>

      <button
        @click="startLesson"
        class="px-4 py-1 bg-blue-600 hover:bg-blue-500 text-center rounded-md text-white shadow-md disabled:bg-gray-200 disabled:text-gray-800 duration-300"
      >
        Bắt đầu
      </button>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import { mathConfig, flashcardConfig } from '@/data/index'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import anim from '@/assets/lottiefiles/default.json'

export default {
  name: 'LessonType',

  props: {
    animation: {
      type: Object,
      require: true,
      default: null
    },
    sectionTitle: {
      type: String,
      require: true,
      default: () => ''
    },

    tag: {
      type: String,
      require: true,
      default: () => 'Coming soon'
    },

    difficulty: {
      type: Boolean,
      require: true,
      default: () => false
    },

    pathName: {
      type: String,
      require: true,
      default: () => ''
    }
  },

  components: {
    Vue3Lottie
  },

  setup(props) {
    const conf = computed(() => {
      return props.pathName === 'baseop' ? mathConfig : flashcardConfig
    })

    const configValue = ref(conf.value[0].value)

    const router = useRouter()

    const startLesson = () => {
      router.push({ name: props.pathName, params: { param: configValue.value } })
    }

    const animationJson = computed(() => {
      return props.animation ? props.animation : anim
    })

    return {
      conf,
      startLesson,
      animationJson,
      configValue
    }
  }
}
</script>
