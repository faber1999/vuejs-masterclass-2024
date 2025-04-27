<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'
import { createNewTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'
const isOpen = defineModel<boolean>()

type SelectOption = {
  value: number | string
  label: string
}

const selectOptions = ref<Record<string, SelectOption[]>>({
  projects: [],
  profiles: [],
})

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach(project => {
    selectOptions.value.projects.push({
      value: project.id,
      label: project.name,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach(profile => {
    selectOptions.value.profiles.push({
      value: profile.id,
      label: profile.full_name,
    })
  })
}

const getOptions = async () => {
  return Promise.all([getProjectsOptions(), getProfilesOptions()])
}

getOptions()

const createTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
  }

  const { error } = await createNewTaskQuery(task)

  if (error) {
    console.error('Error creating task:', error)
  }

  isOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit
        type="form"
        @submit="createTask"
        submit-label="Create task"
        :config="{
          validationVisibility: 'submit',
        }"
      >
        <FormKit type="text" name="name" id="name" label="Name" placeholder="My new task" validation="required|length:1,255" />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          :options="selectOptions.profiles"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a project"
          :options="selectOptions.projects"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
          validation="required|length:0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
