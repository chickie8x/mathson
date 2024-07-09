<template>
  <div class="h-[calc(100%-64px)] flex justify-center items-center">
    <div class="bg-white w-96 rounded-lg shadow-md">
      <div v-if="isLogin" class="space-y-4">
        <span
          class="block text-center py-4 text-xl uppercase bg-indigo-300 font-bold rounded-t-md text-indigo-900"
          >Đăng nhập</span
        >
        <div class="flex flex-col py-2 px-4">
          <span class="text-sm text-gray-600">Email</span>
          <input
            type="email"
            v-model="username"
            placeholder="Nhập email"
            class="placeholder:text-sm py-1 px-2 border border-gray-200 rounded-sm mt-1 outline-indigo-300"
          />
        </div>

        <div class="flex flex-col py-2 px-4">
          <span class="text-sm text-gray-600">Mật khẩu</span>
          <input
            type="password"
            v-model="password"
            placeholder="Nhập mật khẩu"
            class="placeholder:text-sm px-2 py-1 border border-gray-200 rounded-sm mt-1 outline-indigo-300"
          />
        </div>

        <div class="flex flex-col px-4 items-center">
          <button
            @click="login"
            class="px-4 py-1 bg-indigo-600 text-white w-fit rounded-md hover:bg-indigo-500"
          >
            Đăng nhập
          </button>
        </div>

        <div class="flex justify-end px-4 py-2">
          <span class="text-sm text-gray-600"
            >Chưa có tài khoản?
            <button
              @click="regDisplay"
              class="bg-none border-none text-indigo-500 font-semibold text-sm"
            >
              Đăng ký
            </button></span
          >
        </div>
      </div>

      <div v-else>
        <span
          class="block text-center py-4 text-xl uppercase bg-indigo-300 font-bold rounded-t-md text-indigo-900"
          >Đăng ký</span
        >
        <div class="flex flex-col py-2 px-4">
          <span class="text-sm text-gray-600">Email</span>
          <input
            type="email"
            v-model="regUsername"
            placeholder="Nhập email"
            class="placeholder:text-sm py-1 px-2 border border-gray-200 rounded-sm mt-1 outline-indigo-300"
          />
        </div>

        <div class="flex flex-col py-2 px-4">
          <span class="text-sm text-gray-600">Mật khẩu</span>
          <input
            type="password"
            v-model="regPassword"
            placeholder="Nhập mật khẩu"
            class="placeholder:text-sm px-2 py-1 border border-gray-200 rounded-sm mt-1 outline-indigo-300"
          />
        </div>

        <div class="flex flex-col py-2 px-4">
          <span class="text-sm text-gray-600">Nhập lại mật khẩu</span>
          <input
            type="password"
            v-model="regPassword2"
            placeholder="Nhập mật khẩu"
            class="placeholder:text-sm px-2 py-1 border border-gray-200 rounded-sm mt-1 outline-indigo-300"
          />

        <div class="flex flex-col py-4 px-4 items-center">
          <button
            @click="register"
            class="px-4 py-1 bg-indigo-600 text-white w-fit rounded-md hover:bg-indigo-500"
          >
            Đăng ký
          </button>
        </div>

        <div class="flex justify-end px-4 py-2">
          <span class="text-sm text-gray-600"
            >Đã có tài khoản?
            <button
              @click="loginDisplay"
              class="bg-none border-none text-indigo-500 font-semibold text-sm"
            >
              Đăng nhập
            </button></span
          >
        </div>
      </div>
    </div>
    <Toaster position="top-center" richColors :toastOptions="{style: { marginTop: '40px'}}"/>
  </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'
import { Toaster, toast } from 'vue-sonner'


export default {
  name: 'AuthView',

  components: {
    Toaster
  },

  setup(_, {emit}) {
    const router = useRouter()
    const isLogin = ref(true)

    const regDisplay = () => {
      isLogin.value = false
    }

    const loginDisplay = () => {
      isLogin.value = true
    }

    const username = ref(null)
    const password = ref(null)

    const regUsername = ref(null)
    const regPassword = ref(null)
    const regPassword2 = ref(null)

    const login = () => {
      signInWithEmailAndPassword(auth, username.value, password.value)
        .then((user) => {
          router.push('/')
          emit('noticeLogin')
        })
        .catch((err) => {
          toast.error('Lỗi đăng nhập, kiểm tra lại email và mật khẩu')
        })
    }

    const register = () => {
      if(regPassword.value !== regPassword2.value){
        toast.error('Mật khẩu không trùng khớp , hãy thử lại')
        return
      }
      else{
        createUserWithEmailAndPassword(auth, regUsername.value, regPassword.value).then(() => {
          router.push('/')
        }).catch((err) => {
          toast.error('Đăng ký không thành công')
        })
      }
    }

    return {
      isLogin,
      regDisplay,
      loginDisplay,
      username,
      password,
      regUsername,
      regPassword,
      regPassword2,
      login,
      register,
    }
  }
}
</script>
