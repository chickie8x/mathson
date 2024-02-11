<template>
    <div class="">
        <div class="flex space-x-4">
            <div v-for="item, idx in listnum" :key="idx" class="w-12 h-12 border-2 border-blue-200 rounded-sm">
                <input type="text" v-model="listnum[idx]" :disabled="item===resultSet[idx]" class="w-full h-full text-center border-none outline-none bg-blue-50" :class="[item!==resultSet[idx]?'!bg-blue-100':'']">
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
    name: "ComponentFill",

    props: {
        data: {
            type: Array,
            require: true,
            default: () => []
        }
    },

    setup(props) {
        
        const resultSet = ref(props.data)

        const listnum = computed(() => {
            let nums = [...props.data]
            let idx = []
            while(idx.length < 3){
                let id = Math.floor(Math.random()*10)
                if(!idx.includes(id) && id < nums.length){
                    nums[id] = null
                    idx.push(id)
                }
            }
            return nums
        })


        return {
            listnum,
            resultSet
        }
    }
}
</script>
