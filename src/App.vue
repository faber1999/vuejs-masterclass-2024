<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
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
