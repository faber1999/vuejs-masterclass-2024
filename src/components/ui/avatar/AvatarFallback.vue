<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from 'radix-vue'

const props = defineProps<AvatarFallbackProps>()
</script>

<template>
  <AvatarFallback v-bind="props" class="h-full w-full object-cover">
    <slot />
  </AvatarFallback>
</template>
