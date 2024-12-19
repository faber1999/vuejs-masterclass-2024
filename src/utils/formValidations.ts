export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()

  if (!trimmedEmail) return []

  const errors = []

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

  const isValidEmailFormat = emailRegex.test(trimmedEmail)

  if (!isValidEmailFormat) {
    errors.push('Invalid email format')
  }

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []
  const minPasswordLength = 6
  const notAllowedCharacters = ['@']

  if (password.length <= minPasswordLength) {
    errors.push(`Password must be more than ${minPasswordLength} characters`)
  }

  if (notAllowedCharacters.some(char => password.includes(char))) {
    errors.push(`Password cannot contain ${notAllowedCharacters.join(', ')}`)
  }

  return errors
}
