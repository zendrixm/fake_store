export interface User {
  id: number
  username: string
  password?: string
  email?: string
}

export interface SignUpUser {
  username: string
  password: string
  email: string
}
