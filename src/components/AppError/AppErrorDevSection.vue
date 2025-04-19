<script setup lang="ts">
interface Props {
  message: string
  errorCode: number
  details: string
  code: string
  hint: string | null
}

defineProps<Props>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ code || errorCode }}</h1>
    <p v-if="code && errorCode" class="error__code">Status Code: {{ errorCode }}</p>
    <p class="error__msg">{{ message }}</p>

    <p v-if="hint">{{ hint }}</p>
    <p v-if="details">{{ details }}</p>

    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
