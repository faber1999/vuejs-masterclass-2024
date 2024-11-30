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

  const setError = ({ error, errorCode }: MyError) => {
    if (typeof error === 'string') {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = errorCode || 500
      return
    }

    if (isPostgrestError(error)) {
      activeError.value = error
      activeError.value.customCode = errorCode || 500
      return
    }

    if (error instanceof Error) {
      activeError.value = error
      activeError.value.customCode = errorCode || 500
      return
    }
  }

  return {
    activeError,
    setError,
  }
})
