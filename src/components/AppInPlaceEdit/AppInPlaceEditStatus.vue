<script setup lang="ts">
interface Props {
  readOnly?: boolean
}

const { readOnly = false } = defineProps<Props>()

const status = defineModel<'in-progress' | 'completed'>()

const emits = defineEmits(['commit'])

const toggleValue = () => {
  if (readOnly) return

  status.value = status.value === 'completed' ? 'in-progress' : 'completed'
  emits('commit')
}
</script>

<template>
  <div class="text-2xl cursor-pointer w-fit" @click="toggleValue">
    <Transition name="scale" mode="out-in">
      <iconify-icon v-if="status === 'completed'" icon="lucide:circle-check" class="text-green-500" />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
    </Transition>
  </div>
</template>
