<template>
  <Transition name="fade">
    <div
      class="w-full flex justify-center divide-x-2"
    >
      <div class="w-[1024px] bg-gray-300 h-full overflow-auto p-4 !text-gray-800">
        <SumComponent :data="dataSetSum" :resultSet="sumResult" ref="sumComponent" />

        <CompareComponent :data="dataSetCompare" :resultSet="compareResult" ref="compComponent" />

        <SortComponent :data="dataSort" :resultSet="sortResult" ref="sortComponent" />

        <SortComponent
          :data="dataSortReverse"
          :resultSet="sortReverseResult"
          :sortType="'reverse'"
          ref="sortReverseComponent"
        />
      </div>

      <div class="w-[300px] bg-gray-400 h-full p-4">
        <div class="flex items-center space-x-2">
          <img src="@/assets/icons/user.svg" class="w-6 h-6" alt="user" />
          <span> Ngô Đăng Nam</span>
        </div>
        <div class="flex items-center justify-start mt-4 space-x-2">
          <Vue3Lottie
            :animationData="sandclockJson"
            :speed="0.1"
            :noMargin="true"
            width="40px"
            height="40px"
          />
          <span class="text-2xl font-bold">{{ minutes }} : {{ seconds }}</span>
        </div>
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

export default {
  name: 'ModalTemplate1',
  props: {
    config: {
      type: Object,
      require: true,
      default: () => ({
        numsOfElement: 2,
        baseOperators: {
          calculateRange: 5
        },
        sortOperators: {
          sortLength: 3
        }
      })
    }
  },
  components: {
    Vue3Lottie,
    SumComponent,
    CompareComponent,
    SortComponent
  },
  setup(props, { emit }) {
    const compareNUms = ref([])
    const countdown = ref(1800)
    const dataSetSum = ref([])
    const dataSetCompare = ref([])
    const dataSort = ref([])
    const dataSortReverse = ref([])

    const sumResult = ref([])
    const compareResult = ref([])
    const sortResult = ref([])
    const sortReverseResult = ref([])

    const sumComponent = ref(null)
    const compComponent = ref(null)
    const sortComponent = ref(null)
    const sortReverseComponent = ref(null)

    const minutes = computed(() => {
      return toMinnute(countdown.value)
    })
    const seconds = computed(() => {
      return toSeconds(countdown.value)
    })

    setInterval(() => {
      countdown.value -= 1
    }, 1000)

    const genSums = () => {
      const genNums = generateNums(numSet, props.config.numsOfElement).filter((item) => {
        return (
          item.reduce((prev, curr) => prev + curr, 0) <= props.config.baseOperators.calculateRange
        )
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

      const genSort = generateNums(numSet, props.config.sortOperators.sortLength)
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
