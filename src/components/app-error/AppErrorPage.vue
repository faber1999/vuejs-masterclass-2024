<script setup lang="ts">
const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)
const isCustomError = ref(errorStore.isCustomError)

const message = ref('')
const errorCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')

if (error.value && !('details' in error.value)) {
  message.value = error.value.message
  errorCode.value = error.value.customCode ?? 0
}

if (error.value && 'details' in error.value) {
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  errorCode.value = error.value.customCode ?? 0
}

router.afterEach(() => {
  errorStore.clearError()
})

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))
</script>

<template>
  <section class="error">
    <ErrorTemplate :message :code :error-code :details :hint :is-custom-error />
  </section>
</template>

<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
