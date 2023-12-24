<template>
  <div class="bg-white p-4 w-[300px] h-fit">
    <span class="block uppercase mb-4 font-semibold text-blue-500">Phép so sánh</span>
    <div class="flex items-center space-x-12">
      <select
        name="compare-dificulty-level"
        id="compare-dificulty-level"
        v-model="difficultyLevel"
        :disabled="customRules"
        class="bg-blue-500 text-white px-4 py-1 outline-none rounded-md border-none"
      >
        <option v-for="(item, idx) in conf" :key="idx" :value="item">{{ item.text }}</option>
      </select>
      <div class="flex items-center space-x-2">
        <label for="compare-manual-config">Tuỳ chọn</label>
        <input type="checkbox" v-model="customRules" id="compare-manual-config" class="scale-125" />
      </div>
    </div>

    <div class="mt-4 px-2 duration-800" v-if="customRules">
      <div>
        <div class="mt-4 h-fit">
          <div class="flex items-center justify-between"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { conf } from '../base-operator/conf'

export default {
  name: 'CompareNums',

  setup() {
    const difficultyLevel = ref(conf[0])
    const customRules = ref(false)
    return {
      conf,
      difficultyLevel,
      customRules
    }
  }
}
</script>
