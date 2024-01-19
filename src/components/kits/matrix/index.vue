<template>
    <!-- <div class="grid grid-cols-3 grid-rows-3 w-36 h-36">
        <div v-for="item, idx in incompleteMatrix" :key="idx" class="w-12 h-12">
            <div v-for="jtem, jdx in item" :key="jdx" class="w-full h-full border flex items-center justify-center">
                {{ jtem }}
            </div>
        </div>
    </div> -->
    <div>
        <div v-for="item, idx in incompleteMatrix" :key="idx" class="w-36 flex ">
            <div v-for="jtem, jdx in item" :key="jdx" class="w-36 h-12 border flex">
                <div class="w-12 h-12 flex items-center justify-center">
                    {{ jtem }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { shuffleArray } from '@/data'
export default {
    name: 'MatrixComponent',
    props: {
        matrix: {
            type: Array,
            require: true,
            default: () => []
        }
    },

    setup(props){
        const incompleteMatrix = computed(() => {
            let ret = [[...props.matrix[0]], [...props.matrix[1]], [...props.matrix[2]]]
            let idx = shuffleArray([0,1,2])
            for(let i = 0; i < ret.length; i++){
                ret[i][idx[i]] = null
            }
            return ret
        })

        console.log(incompleteMatrix.value)

        return {
            incompleteMatrix,
        }
    }
}
</script>
