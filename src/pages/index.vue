<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink to="/projects">Go to projects</RouterLink>
    <br />
    <RouterLink to="/tasks">Go to tasks</RouterLink>
  </div>
</template>
