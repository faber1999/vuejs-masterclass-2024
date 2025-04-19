<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasksLoader = useTasksStore()

const { tasksWithProjects } = storeToRefs(tasksLoader)
const { getTasksWithProjects } = tasksLoader

await getTasksWithProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasksWithProjects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable v-if="tasksWithProjects" :columns="columnsWithCollabs" :data="tasksWithProjects" />
</template>
