import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

type MyError = {
  error: string | PostgrestError | Error
  errorCode?: number
}

const isPostgrestError = (err: Error): err is PostgrestError => {
  return err && typeof err === 'object' && 'message' in err && 'details' in err
}

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)
  const isCustomError = ref(false)

  const setError = ({ error, errorCode = 500 }: MyError) => {
    if (typeof error === 'string') {
      isCustomError.value = true
      activeError.value = Error(error)
      activeError.value.customCode = errorCode
      return
    }

    if (isPostgrestError(error)) {
      activeError.value = error
      activeError.value.customCode = errorCode
      return
    }

    if (error instanceof Error) {
      activeError.value = error
      activeError.value.customCode = errorCode
      return
    }
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
