<script setup lang="ts">
import { useRoute } from 'vue-router'

const { params } = useRoute('/tasks/[id]')

usePageStore().pageData.title = 'Task Detail'
</script>

<template>
  <div>
    <h1>Task {{ params.id }}</h1>
  </div>
</template>
