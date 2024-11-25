<script setup lang="ts">
const { params } = useRoute('/projects/[slug]')

usePageStore().pageData.title = 'Project Detail'
</script>

<template>
  <div>
    <h1>Project: {{ params?.slug }}</h1>

    <RouterLink to="/projects">Go to projects</RouterLink>
  </div>
</template>
