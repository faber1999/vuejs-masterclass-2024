<script setup lang="ts">
import { useRoute } from 'vue-router'

const { params } = useRoute('/projects/[id]')
</script>

<template>
  <div>
    <h1>Hello World {{ params?.id }}</h1>
  </div>
</template>
