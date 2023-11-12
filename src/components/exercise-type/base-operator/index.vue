<template>
  <div class="bg-white p-4 w-fit">
    <span class="block uppercase mb-4 font-semibold text-blue-500">Phép toán cơ sở</span>
    <div class="flex items-center space-x-12">
      <select
        name="dificulty-level"
        id="dificulty-level"
        v-model="difficultyLevel"
        :disabled="customeRules"
        class="bg-blue-500 text-white px-4 py-1 outline-none rounded-md border-none"
      >
        <option v-for="(item, idx) in conf" :key="idx" :value="item">{{ item.text }}</option>
      </select>
      <div class="flex items-center space-x-2">
        <label for="manual-config">Tuỳ chọn</label>
        <input type="checkbox" v-model="customeRules" id="manual-config" class="scale-125" />
      </div>
    </div>

    <div>
      <div>
        <span>Phép tính</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { conf, operators } from './conf'

export default {
  name: 'BaseOperator',

  setup() {
    const difficultyLevel = ref(conf[0])
    const customeRules = ref(false)

    return {
      difficultyLevel,
      conf,
      customeRules
    }
  }
}
</script>
