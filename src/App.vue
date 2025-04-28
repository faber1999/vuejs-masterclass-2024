<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured(error => {
  errorStore.setError({ error })
  return false
})

onMounted(() => {
  useAuthStore().trackAuthChanges()
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('@/components/layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout" :key="user ? 'auth' : 'guest'">
    <AppErrorPage v-if="errorStore.activeError" />

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
  </Component>
</template>
