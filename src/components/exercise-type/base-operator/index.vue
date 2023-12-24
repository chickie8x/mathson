<template>
  <div class="bg-white p-4 w-[300px] h-fit">
    <span class="block uppercase mb-4 font-semibold text-blue-500">Phép toán cơ sở</span>
    <div class="flex items-center space-x-12">
      <select
        name="dificulty-level"
        id="dificulty-level"
        v-model="difficultyLevel"
        :disabled="customRules"
        class="bg-blue-500 text-white px-4 py-1 outline-none rounded-md border-none"
      >
        <option v-for="(item, idx) in conf" :key="idx" :value="item">{{ item.text }}</option>
      </select>
      <div class="flex items-center space-x-2">
        <label for="manual-config">Tuỳ chọn</label>
        <input type="checkbox" v-model="customRules" id="manual-config" class="scale-125" />
      </div>
    </div>

    <div class="mt-4 px-2 duration-800" v-if="customRules">
      <div>
        <span class="text-xl text-blue-500">Phép tính</span>
        <div class="flex items-center flex-wrap">
          <div v-for="(item, idx) in operators" :key="idx" class="flex items-center min-w-[120px]">
            <input type="checkbox" class="mr-2 scale-125" :id="item.id" />
            <span>{{ item.text }}</span>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-xl text-blue-500">Phạm vi tính toán</span>
          <div class="flex items-center space-x-2">
            <input type="range" min="5" max="20" class="w-full" v-model.number="calScope" />
            <span class="w-8">{{ calScope }}</span>
          </div>
        </div>
        <div class="mt-4">
          <span class="block text-blue-500 text-xl">Số lượng số hạng</span>
          <div class="flex items-center space-x-2">
            <input type="range" min="2" max="4" v-model.number="elemNums" class="w-full" />
            <span class="w-8">{{ elemNums }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { conf, operators } from './conf'
import { opSum, generateNums, shuffleArray } from '@/data'

export default {
  name: 'BaseOperator',

  setup() {
    const difficultyLevel = ref(conf[0])
    const customRules = ref(false)
    const calScope = ref(10)
    const dataSet = ref([])
    const elemNums = ref(2)
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const parentTrigger = () => {
      const genNums = generateNums(arr, elemNums.value).filter((item) => {
        return item.reduce((prev, curr) => prev + curr, 0) <= calScope.value
      })

      shuffleArray(genNums).map((item) => {
        dataSet.value.push(opSum(item))
      })

      return dataSet.value.slice(0, 20)
    }

    const flushData = () => {
      dataSet.value = []
    }

    return {
      difficultyLevel,
      conf,
      customRules,
      operators,
      dataSet,
      calScope,
      elemNums,
      parentTrigger,
      flushData
    }
  }
}
</script>
