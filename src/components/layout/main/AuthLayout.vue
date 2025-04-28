<script setup lang="ts">
import { MenuKey } from '@/utils/injectionKeys'

const { pageData } = storeToRefs(usePageStore())

const isNewTaskOpen = ref(false)

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

provide(MenuKey, {
  menuOpen,
  toggleMenu,
})
</script>

<template>
  <Sidebar @task-clicked="isNewTaskOpen = true" />
  <AppNewTask v-model="isNewTaskOpen" />

  <div
    class="flex flex-col lg:ml-52 ml-24 transition-[margin]"
    :class="{
      'ml-52': menuOpen,
      'ml-24': !menuOpen,
    }"
  >
    <TopNavbar />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
