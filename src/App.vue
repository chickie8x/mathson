<template>
  <div class="relative w-full h-screen bg-blue-50 overflow-auto">
    <Toaster position="top-center" richColors/>
    <NavBar @noticeLogout="logoutNotify"/>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" @noticeLogin="loginNotify"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import AnimalsFlashCard from '@/components/templates/template2/index.vue'
import NavBar from '@/components/navbar/index.vue'
import { useRoute } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'


export default {
  name: 'App',

  components: {
    AnimalsFlashCard,
    NavBar,
    Toaster,
  },
  setup() {
    const route = useRoute()


    const loginNotify = () => {
      toast.success('Đăng nhập thành công', {
          style:{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        })
    }

    const logoutNotify = () => {
      toast.error('Đã đăng xuất', {
          style:{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        })
    }

    return {
      route,
      loginNotify,
      logoutNotify
    }
  }
}
</script>
