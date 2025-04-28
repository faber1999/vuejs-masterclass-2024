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
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user ? 'auth' : 'guest'">
      <AppErrorPage v-if="errorStore.activeError" />

      <RouterView v-else v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <Suspense v-if="Component" :timeout="0">
            <Component :is="Component" :key="route.name" />
            <template #fallback>
              <div
                class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
              >
                <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
              </div>
            </template>
          </Suspense>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>
