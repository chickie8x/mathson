<template>
  <div class="h-[calc(100%-64px)] divide-y divide-dashed divide-gray-300">
    <div class="mx-auto w-[1156px] px-2 py-1 sm:py-6 sm:px-6 lg:px-8 lg:py-8 flex flex-col">
      <div class="flex justify-between p-4 h-full">
        <Vue3Lottie
          :animationData="homeSection1"
          :noMargin="true"
          width="400px"
          height="400px"
          role="button"
          :speed="0.7"
        />
        <div class="">
          <span class="font-Nunito text-3xl font-bold text-gray-600 block text-center px-24"
            >Chào mừng bạn đến với ứng dụng nhỏ giúp bé học tập</span
          >
          <div class="text-gray-500 mt-6 px-24">
            <span class="block mt-2"
              >Việc học đầu đời của trẻ đóng vai trò quan trọng và có ảnh hưởng sâu rộng đến sự phát
              triển toàn diện của trẻ trong tương lai</span
            >
            <span class="block mt-2"
              >Học đầu đời giúp trẻ xây dựng nền tảng vững chắc về kiến thức cơ bản như ngôn ngữ,
              toán học, và khoa học.</span
            >
            <span class="block mt-2"
              >Giúp kích thích tư duy logic và sự sáng tạo từ giai đoạn đầu đời, hỗ trợ cho sự phát
              triển tư duy toàn diện.</span
            >
            <span class="block mt-2"
              >Việc học từ nhỏ tạo nền tảng cho sự sẵn sàng học tập ở các cấp học cao hơn.</span
            >
          </div>
          <div class="flex items-center justify-center mt-4">
            <button
              type="button"
              @click="goToLesson"
              class="mt-4 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Bắt đầu ngay
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="flex flex-row-reverse justify-between px-4 py-12 w-[1156px] mx-auto">
      <Vue3Lottie
        :animationData="homeSection2"
        :noMargin="true"
        width="400px"
        height="400px"
        role="button"
        :speed="0.7"
      />

      <div class="flex-1">
        <span class="font-Nunito text-3xl font-bold text-gray-600 block text-center px-24">
          Đăng ký tài khoản
        </span>

        <div class="text-gray-500 mt-6 px-24 flex flex-col">
          <span class="block mt-2"
            >Bạn hoàn toàn có thể dùng các chức năng của trang web hoàn toàn miễn phí mà không cần
            phải đăng ký tài khoản hay đăng nhập</span
          >
          <span class="block mt-2"
            >Nhưng việc đăng ký một tài khoản sẽ giúp bạn theo dõi đc biểu đồ tiến bộ , biểu đồ
            chuyên cần theo thời gian khi luyện tập trên trang web</span
          >
          <span class="block mt-2">
            Đồng thời bạn sẽ thu thập được các huy hiệu cho từng giai đoạn hay thành tích đạt được
            khi luyện tập trên trang web
          </span>
          <span class="block mt-2"
            >Nếu bạn đạt thành tích cao thì danh tính của bạn sẽ được hiển thị trên bảng xếp hạng
            hiển thị trên trang web</span
          >
        </div>
        <div class="flex justify-center mt-4">
          <button
            class="mt-4 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
    <Toaster position="top-center" richColors/>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { Vue3Lottie } from 'vue3-lottie'
import homeSection1 from '@/assets/lottiefiles/default.json'
import homeSection2 from '@/assets/lottiefiles/chart.json'
import { computed, onMounted } from 'vue'
import { Toaster, toast } from 'vue-sonner'


export default {
  name: 'HomeView',

  components: {
    Vue3Lottie,
    Toaster,
  },

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

    const meta = computed(() => route.meta.authMessage)
    const authToast = () => {
      if(meta.value){
        toast.success('Đăng nhập thành công', {
          style:{
            marginTop: '40px'
          }
        })
      }
    }

    onMounted(() => {
      authToast()
    })

    return {
      goToLesson,
      homeSection1,
      homeSection2,
    }
  }
}
</script>
