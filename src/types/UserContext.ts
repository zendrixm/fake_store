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

export interface UserProfile {
  address: {
    city: string
    number: number
    street: string
    zipcode: string
  }
  email: string
  id: number
  name: {
    firstname: string
    lastname: string
  }
  username: string
  password: string
  phone: string
}
