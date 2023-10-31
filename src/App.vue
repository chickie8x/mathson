<template>
  <div>
    <div>

      <div>
        <span>Chọn cấp độ</span>
        <select name="class-selection" id="class-selection" v-model=currentClass>
          <option v-for="item, idx in classSelect" :key="idx" :value="item.value">{{ item.text }}</option>
        </select>
      </div>

      <div>
        <span>Chọn độ khó</span>
        <select name="dificulty-selection" id="dificulty-selection" v-model=currentDifficulty>
          <option v-for="item, idx in difficultyLevel" :key="idx" :value="item.value">{{ item.text }}</option>
        </select>
      </div>

    </div>
    
    <div>
      <div>
        <div v-for="item, idx in math" :key="idx">
          <span>{{ `${item[0]} + ${ item[1]} = ` }} <input type="number" ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { classSelect, difficultyLevel, exerciseType } from './data';

export default {
  name: "App",

  setup(){

    const currentClass = ref(classSelect[0].value)
    const currentDifficulty = ref(difficultyLevel[0].value)
    const math = exerciseType.sum.generateItem([0,1,2,3,4,5,6,7,8,9], 2)

    return {
      classSelect,
      difficultyLevel,
      currentClass,
      currentDifficulty,
      math
    }
  }
}
</script>
