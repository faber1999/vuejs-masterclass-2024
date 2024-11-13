<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

console.log('supabase', supabase)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
