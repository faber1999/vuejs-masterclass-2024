export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  username: string
  first_name: string
  last_name: string
  confirm_password: string
}
