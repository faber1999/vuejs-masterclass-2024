<script setup lang="ts">
import AppErrorPage from './components/app-error/AppErrorPage.vue'

const { activeError } = storeToRefs(useErrorStore())
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>

        <template #fallback>
          <div class="flex items-center justify-center h-screen">
            <p>Loading...</p>
          </div>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
