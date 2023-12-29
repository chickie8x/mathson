<template>
  <div class="h-[calc(100%-64px)]">
    <div class="mx-auto max-w-7xl h-full px-2 py-1 sm:py-6 sm:px-6 lg:px-8 lg:py-8">
      <div class="flex justify-center items-center p-4 h-full">
        <img src="src/assets/images/general/study-banner3.png" alt="" class="w-96" />
        <div class="">
          <span class="font-Nunito text-4xl font-bold text-gray-600 block text-center px-24">Chào mừng bạn đến với ứng
            dụng nhỏ giúp bé học tập</span>
          <div class="text-gray-500 mt-6 px-24">
            <span class="block">Việc học đầu đời của trẻ đóng vai trò quan trọng và có ảnh hưởng sâu rộng đến sự phát
              triển toàn diện của trẻ trong tương lai</span>
            <span class="block">Học đầu đời giúp trẻ xây dựng nền tảng vững chắc về kiến thức cơ bản như ngôn ngữ,
              toán học, và khoa học.</span>
            <span class="block">Giúp kích thích tư duy logic và sự sáng tạo từ giai đoạn đầu đời, hỗ trợ cho sự phát
              triển tư duy toàn diện.</span>
            <span class="block">Việc học từ nhỏ tạo nền tảng cho sự sẵn sàng học tập ở các cấp học cao hơn.</span>
          </div>
          <div class="flex items-center justify-center mt-4">
            <button type="button"
              @click="goToLesson"
              class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Bắt đầu ngay
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
export default {
  name: 'HomeView',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const config = {
      numsOfElement: 2,
      baseOperators: {
        calculateRange: 5
      },
      sortOperators: {
        sortLength: 3
      }
    }
    const goToLesson = () => {
      route.params.config = config
      router.push('/practice')
    }

    return {
      goToLesson
    }
  }
}
</script>
