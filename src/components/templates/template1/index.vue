<template>
  <Transition name="fade">
    <div class="w-full flex flex-col items-center relative">
      <div class="w-[1024px] sticky top-0 left-0 px-4 mt-4">
        <div class="flex items-center justify-center bg-white space-x-2 shadow-md py-2">
          <Vue3Lottie
            :animationData="sandclockJson"
            :speed="0.1"
            :noMargin="true"
            width="40px"
            height="40px"
          />
          <span class="text-2xl font-bold">{{ minutes }} : {{ seconds }}</span>
        </div>
      </div>

      <div class="w-[1024px] p-4 !text-gray-800 space-y-8">
        <SumComponent :data="dataSetSum" :resultSet="sumResult" ref="sumComponent" />

        <CompareComponent :data="dataSetCompare" :resultSet="compareResult" ref="compComponent" />

        <SortComponent :data="dataSort" :resultSet="sortResult" ref="sortComponent" />

        <SortComponent
          :data="dataSortReverse"
          :resultSet="sortReverseResult"
          :sortType="'reverse'"
          ref="sortReverseComponent"
        />

        <div class="mt-4">
          <button @click="testEnd" class="px-4 py-1 rounded-sm shadow-sm bg-blue-500 text-white">
            Xem kết quả
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import {
  toMinnute,
  toSeconds,
  numSet,
  generateNums,
  opSum,
  shuffleArray,
  compareExp,
  genCompareSet,
  sortNums,
  sortNumsReversed
} from '@/data'
import { Vue3Lottie } from 'vue3-lottie'
import sandclockJson from '@/assets/lottiefiles/sandclock.json'
import SumComponent from '@/components/kits/sum/index.vue'
import CompareComponent from '@/components/kits/compare/index.vue'
import SortComponent from '@/components/kits/sort/index.vue'
import { useRoute } from 'vue-router'
import { mathConfig } from '@/data/index'

export default {
  name: 'ModalTemplate1',

  components: {
    Vue3Lottie,
    SumComponent,
    CompareComponent,
    SortComponent
  },
  setup() {
    const compareNUms = ref([])
    const countdown = ref(1800)
    const dataSetCompare = ref([])
    const dataSort = ref([])
    const dataSortReverse = ref([])

    const compareResult = ref([])
    const sortResult = ref([])
    const sortReverseResult = ref([])

    const sumComponent = ref(null)
    const compComponent = ref(null)
    const sortComponent = ref(null)
    const sortReverseComponent = ref(null)

    const route = useRoute()

    const confMap = {
      easy: 0,
      medium: 1,
      hard: 2
    }

    const conf = mathConfig[confMap[route.params.param]].config

    const minutes = computed(() => {
      return toMinnute(countdown.value)
    })
    const seconds = computed(() => {
      return toSeconds(countdown.value)
    })

    setInterval(() => {
      if (countdown.value > 0) {
        countdown.value -= 1
      }
    }, 1000)

    const genSums = () => {
      const genNums = generateNums(numSet, conf.numsOfElement).filter((item) => {
        return item.reduce((prev, curr) => prev + curr, 0) <= conf.baseOperators.calculateRange
      })

      shuffleArray(genNums).map((item) => {
        let pairNums = genCompareSet(item)
        if (dataSetCompare.value.length < 25) {
          dataSetCompare.value.push(compareExp(pairNums))
          compareResult.value.push(null)
        } else {
          return
        }
      })

      shuffleArray(genNums).map((item) => {
        if (dataSetSum.value.length < 25) {
          dataSetSum.value.push(opSum(item))
          sumResult.value.push(null)
        } else {
          return
        }
      })

      const genSort = generateNums(numSet, conf.sortOperators.sortLength)
      shuffleArray(genSort).map((item) => {
        if (dataSort.value.length < 5) {
          let obj = {}
          obj.strExp = item.join(', ')
          obj.sortedRet = sortNums(item)
          dataSort.value.push(obj)
          sortResult.value.push(new Array(item.length).fill(null))
        } else {
          if (dataSortReverse.value.length < 5) {
            let obj = {}
            obj.strExp = item.join(', ')
            obj.sortedRet = sortNumsReversed(item)
            dataSortReverse.value.push(obj)
            sortReverseResult.value.push(new Array(item.length).fill(null))
          } else {
            return
          }
        }
      })
    }

    const testEnd = () => {
      sumComponent.value.trigger()
      compComponent.value.trigger()
      sortComponent.value.trigger()
      sortReverseComponent.value.trigger()
    }

    onMounted(() => {
      genSums()
    })

    return {
      compareNUms,
      minutes,
      seconds,
      sandclockJson,
      dataSetSum,
      dataSetCompare,
      dataSort,
      dataSortReverse,
      sumResult,
      compareResult,
      sortResult,
      sortReverseResult,
      sumComponent,
      compComponent,
      sortComponent,
      sortReverseComponent,
      testEnd
    }
  }
}
</script>
