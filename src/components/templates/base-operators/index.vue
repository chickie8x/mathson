<template>
  <div>

    <div class="mt-8">
      <SumOperator />
    </div>

    <div class="mt-8">
      <CompareOperator />
    </div>

  </div>
</template>

<script>
import SumOperator from '@/components/kits/sum-op/index.vue'
import CompareOperator from '@/components/kits/compare-op/index.vue'

export default {
    name: 'BaseOperator',

    components: {
        SumOperator,
        CompareOperator
    }

}
</script>
