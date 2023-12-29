<template>
  <div
    class="fixed top-0 left-0 bg-gray-100 w-full h-screen flex items-center justify-center"
    v-if="false"
  >
    <div class="flex flex-col items-center">
      <span
        class="text-2xl text-blue-500 mb-4 font-bold bg-white bg-opacity-50 backdrop-blur-md px-4 py-1 block w-fit rounded-md shadow-md"
        >{{ flashcards.animals.title }}</span
      >
      <div>
        <Vue3Lottie
          :animationData="backgroundAnimation"
          :speed="0.3"
          :noMargin="true"
          width="100%"
          height="100%"
          class="fixed top-0 left-0 z-[-1] scale-150"
        />
        <div class="z-10 flex items-center justify-center">
          <Vue3Lottie
            :animationData="nextButton"
            :noMargin="true"
            width="160px"
            height="160px"
            class="scale-[-1] transform-[-1]"
            role="button"
            @click="moveBack"
          />
          <div
            class="flex flex-col justify-center items-center rounded-md p-4 bg-white bg-opacity-60 backdrop-blur-md shadow-md select-none"
          >
            <div class="w-[480px] h-[320px]" :key="card.id">
              <img :src="card.img" alt="" class="w-full h-full object-cover rounded-md" />
            </div>
            <div class="flex items-center justify-between w-full mt-2">
              <span class="text-xl text-blue-500 font-bold capitalize">{{
                lang.value === 'vie' ? card.vie : card.eng
              }}</span>
              <div class="flex items-center space-x-2">
                <img :src="lang.icon" alt="" class="w-7 rounded-sm" />
                <select
                  name="language"
                  id="lang"
                  v-model="lang"
                  class="border border-cyan-500 rounded-md px-1 focus:outline-none"
                >
                  <option
                    v-for="(item, idx) in language"
                    :key="idx"
                    :value="item"
                    class="flex items-center"
                  >
                    {{ item.text }}
                  </option>
                </select>
                <Vue3Lottie
                  :animationData="speaker"
                  :noMargin="true"
                  width="50px"
                  height="50px"
                  role="button"
                  @click="doPlaySound"
                />
              </div>
            </div>
          </div>
          <Vue3Lottie
            :animationData="nextButton"
            :noMargin="true"
            width="160px"
            height="160px"
            role="button"
            @click="moveNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { flashcards } from './flashcard'
import { computed, ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import backgroundAnimation from '@/assets/lottiefiles/background.json'
import nextButton from '@/assets/lottiefiles/next-button.json'
import speaker from '@/assets/lottiefiles/speaker.json'
import { language } from '@/data'

export default {
  name: 'AnimalFlashCard',

  components: {
    Vue3Lottie
  },

  setup() {
    const currIndex = ref(0)
    const lang = ref(language[0])
    const card = computed(() => {
      return flashcards.animals.items[currIndex.value]
    })

    const moveNext = () => {
      if (currIndex.value < flashcards.animals.items.length - 1) {
        currIndex.value += 1
        return
      }
      alert('Đã xem hết')
      return
    }

    const moveBack = () => {
      if (currIndex.value > 0) {
        currIndex.value -= 1
        return
      }
      return
    }

    const debounce = (func, timeout = 300) => {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
      }
    }

    const playSound = () => {
      const audio = new Audio(card.value.audio[lang.value.value])
      audio.play()
    }

    const doPlaySound = debounce(() => playSound())

    return {
      card,
      moveNext,
      moveBack,
      backgroundAnimation,
      nextButton,
      speaker,
      lang,
      language,
      doPlaySound,
      flashcards
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
