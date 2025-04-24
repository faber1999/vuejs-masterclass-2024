<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasksLoader = useTasksStore()

const { tasksWithProjects } = storeToRefs(tasksLoader)
const { getTasksWithProjects } = tasksLoader

await getTasksWithProjects()
</script>

<template>
  <DataTable v-if="tasksWithProjects" :columns="columns" :data="tasksWithProjects" />
</template>
