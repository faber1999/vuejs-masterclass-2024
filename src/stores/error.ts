import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

type MyError = {
  error: string | PostgrestError
  errorCode: number
}

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  const setError = ({ error, errorCode }: MyError) => {
    if (typeof error === 'string') {
      activeError.value = new Error(error)
      activeError.value.customCode = errorCode
      return
    }

    activeError.value = error
    activeError.value.customCode = errorCode
  }

  return {
    activeError,
    setError,
  }
})
