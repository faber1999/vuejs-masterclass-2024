<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasksLoader = useTasksStore()

const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
