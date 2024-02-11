<template>
    <div>
        <div class="mt-8 bg-white bg-opacity-80 rounded-md shadow-md p-4">
            <span class="text-xl"><span class="font-bold text-blue-700">Yêu cầu: </span> Điền dấu
                <span class="font-bold text-blue-600">> </span>,<span class="font-bold text-blue-600">&lt;
                </span>
                hoặc <span class="font-bold text-blue-600"> =</span> vào ô trống
            </span>
            <div class="grid grid-cols-4 row-auto gap-4 pl-8 mt-4">
                <div v-for="(item, idx) in dataSetCompare" :key="idx" class="space-x-2 flex items-center justify-start">
                    <span class="w-24 flex justify-end">{{ item.strExp[0] }}</span>
                    <input type="text"
                        class="max-w-[32px] border border-blue-300 px-2 font-bold focus:outline-blue-300 hover:bg-blue-100 duration-300"
                        :disabled="isCheckedResult" v-model="compareResult[idx]" @keyup="charFilter(idx)" :class="[
                            isCheckedResult && compareResult[idx] === item.result
                                ? 'bg-green-300 text-green-600 border border-green-600'
                                : '',
                            isCheckedResult && compareResult[idx] !== item.result
                                ? 'bg-red-300 text-red-600 border border-red-600'
                                : ''
                        ]" />
                    <span class="w-24">{{ item.strExp[1] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { mathConfig, generateNums, numSet, shuffleArray, genCompareSet, compareExp } from '@/data'

export default {
    name: 'CompareOperator',

    setup() {
        const dataSetCompare = ref([])
        const compareResult = ref([])
        const route = useRoute()
        const confMap = {
            easy: 0,
            medium: 1,
            hard: 2
        }
        const conf = mathConfig[confMap[route.params.param]].config
        const isCheckedResult = ref(false)

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

        return {
            dataSetCompare,
            compareResult,
            isCheckedResult
        }
    }
}
</script>
