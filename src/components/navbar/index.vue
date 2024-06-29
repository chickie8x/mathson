<template>
  <Disclosure as="nav" class="bg-white bg-opacity-60 backdrop-blur-md shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->

            <router-link
              v-for="(item, idx) in navbar"
              :key="idx"
              :to="item.path"
              :class="[
                item.path === currPath
                  ? '!border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500'
              ]"
              class="inline-flex items-center border-b-2 px-1 pt-1 font-medium hover:border-gray-300 hover:text-gray-700"
              >{{ item.text }}</router-link
            >
          </div>
        </div>
        <div
          v-if="user"
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="h-6 w-6 rounded-full opacity-70" src="/icons/user.svg" alt="" />
                <span class="ml-1 text-indigo-600">{{ user.email }}</span>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="logout"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    class="w-full text-left"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div v-else class="flex items-center space-x-2 text-gray-500 font-medium">
          <router-link to="/auth" class="hover:underline text-gray-600">Login/Register</router-link>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-4 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <DisclosureButton
          v-for="(item, idx) in navbar"
          :key="idx"
          as="a"
          :href="item.path"
          class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          :class="[
            item.path === currPath
              ? '!bg-indigo-50 !border-indigo-500 !text-indigo-700'
              : 'border-transparent text-gray-500'
          ]"
          >{{ item.text }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { navbar } from './navbar'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { user } from '@/firebase'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  name: 'NavBar',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const currPath = computed(() => {
      return route.path
    })

    const logout = () => {
      signOut(auth)
        .then(() => {
          router.push('/')
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    return {
      navbar,
      currPath,
      user,
      logout
    }
  }
}
</script>
