<template>
  <div class="mt-4 bg-white bg-opacity-80 rounded-md shadow-md p-4">
    <span class="text-xl"
      ><span class="font-bold text-blue-700">Yêu cầu:</span> Điền số thích hợp vào ô trống
    </span>
    <div class="mt-2 pl-8">
      <div v-for="(item, idx) in dataSet" :key="idx" class="mt-6">
        <input
          type="number"
          v-for="(jtem, jdx) in item.arrShow"
          :key="jdx"
          v-model="item.arrShow[jdx]"
          :disabled="item.shadowArr[jdx] !== null"
          class="m-2 w-8 h-8 border border-blue-300 outline-none text-center bg-white duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          :class="[
            isCheckResult && item.arrShow[jdx] === item.arr[jdx] && item.shadowArr[jdx] === null
              ? '!bg-green-300 text-green-600 border border-green-600'
              : '',
            isCheckResult && item.arrShow[jdx] !== item.arr[jdx] && item.shadowArr[jdx] === null
              ? '!bg-red-300 text-red-600 border border-red-600'
              : '',
            item.shadowArr[jdx] !== null ? '!bg-blue-100' : ''
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { shuffleArray } from '@/data/index'
import { inject, ref, watchEffect } from 'vue'

export default {
  name: 'FillNumsOperator',

  setup() {
    const isCheckResult = ref(false)
    const triggerListener = inject('trigger')

    watchEffect(() => {
      if (triggerListener.value) {
        isCheckResult.value = true
      }
    })

    const idxNullGen = (x) => {
      const idxs = []
      while (idxs.length < x) {
        let num = Math.floor(Math.random() * 10)
        if (!idxs.includes(num) && num < 9) {
          idxs.push(num)
        }
      }
      return idxs
    }

    const difficulty = {
      easy: () => {
        const startVal = Math.floor(Math.random() * 10)
        let arr = []
        for (let i = startVal; i <= startVal + 8; i++) {
          arr.push(i)
        }
        const idxs = idxNullGen(3)
        const arrShow = [...arr]
        idxs.map((item) => {
          arrShow[item] = null
        })

        const shadowArr = [...arrShow]

        return {
          arr,
          arrShow,
          shadowArr
        }
      },

      medium: () => {
        const startVal = Math.floor(Math.random() * 10)
        let arr = [startVal]
        while (arr.length <= 8) {
          arr.push(arr[arr.length - 1] + 2)
        }

        const idxs = idxNullGen(3)

        const arrShow = [...arr]

        idxs.map((item) => {
          arrShow[item] = null
        })

        const shadowArr = [...arrShow]

        return {
          arr,
          arrShow,
          shadowArr
        }
      },

      hard: () => {
        let startVal = null
        while (!startVal) {
          let num = Math.floor(Math.random() * 10)
          if (num !== 0 && num < 6) {
            startVal = num
          }
        }

        const arr = [startVal]
        let i = 1
        while (arr.length <= 8) {
          arr.push(arr[arr.length - 1] + i)
          i += 1
        }
        const arrShow = [...arr]
        const idxs = idxNullGen(2)
        idxs.map((item) => {
          arrShow[item] = null
        })

        const shadowArr = [...arrShow]

        return {
          arr,
          arrShow,
          shadowArr
        }
      }
    }
    const dataSet = ref([])
    const diff = ['easy', 'medium', 'hard']
    const gen = diff.map((item) => {
      return difficulty[item]()
    })

    dataSet.value = shuffleArray(gen)

    return {
      dataSet,
      isCheckResult
    }
  }
}
</script>
