<script setup lang="ts">
import { MenuKey, type MenuInjectionOptions } from '@/utils/injectionKeys'

interface LinkProp {
  title: string
  to?: string
  icon: string
}

defineProps<{ links: LinkProp[] }>()

const emits = defineEmits<{ actionClicked: [string] }>()

const emitActionClicked = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

const { menuOpen } = inject(MenuKey) as MenuInjectionOptions
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exact-active-class="text-primary bg-muted"
      class="nav-link"
      :class="{
        'justify-normal': menuOpen,
        'justify-center': !menuOpen,
      }"
    >
      <iconify-icon :icon="link.icon" />
      <span
        class="text-nowrap"
        :class="{
          block: menuOpen,
          hidden: !menuOpen,
        }"
        >{{ link.title }}</span
      >
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      @click="emitActionClicked(link.title)"
      :class="{
        'justify-normal': menuOpen,
        'justify-center': !menuOpen,
      }"
    >
      <iconify-icon :icon="link.icon" />
      <span
        class="text-nowrap"
        :class="{
          block: menuOpen,
          hidden: !menuOpen,
        }"
        >{{ link.title }}</span
      >
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>
