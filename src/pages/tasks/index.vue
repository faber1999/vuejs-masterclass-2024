<script setup lang="ts">
import { type TasksWithProjects, tasksWithProjectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) {
    useErrorStore().setError({ error, errorCode: status })
  }

  tasks.value = data
}

await getTasks()

useErrorStore().setError({
  error: Error('I am an uncaught error'),
})
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
