import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

const authStore = useAuthStore()

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    useErrorStore().setError({
      error: error.message,
    })

    return false
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: `${formData.first_name} ${formData.last_name}`,
    })

    if (error) {
      useErrorStore().setError({
        error: error.message,
      })
      return false
    }
  }

  await authStore.setAuth(data.session)

  return true
}

export const logIn = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    useErrorStore().setError({
      error: error.message,
    })

    return false
  }

  await authStore.setAuth(data.session)

  return true
}
