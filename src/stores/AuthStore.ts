import { defineStore } from 'pinia'
import { userSignup, userLogin, fetchAllUsers } from '@/api/Auth'
import type { User, SignUpUser } from '@/types/UserContext'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | User,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async signup(userData: SignUpUser) {
      this.loading = true
      this.error = null

      try {
        const { data } = await userSignup(userData)
        return data
      } catch (err) {
        this.error = 'Signup failed.'
        console.error('Signup error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },
    async login(username: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const { data: users } = await fetchAllUsers()
        const foundUser = (users as User[]).find((user) => user.username === username)

        if (!foundUser) throw new Error('User not found')
        if (foundUser.password !== password) throw new Error('Incorrect password')

        const { data: loginData } = await userLogin(username, password)

        if (!loginData?.token) throw new Error('Login failed')

        this.user = { id: foundUser.id, username: foundUser.username }
        this.isAuthenticated = true
        localStorage.setItem('token', loginData.token)
        localStorage.setItem('userId', foundUser.id.toString())

        return true
      } catch (err) {
        console.error('Auth error:', err)
        this.error = 'Invalid username or password'
        this.user = null
        this.isAuthenticated = false
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },

    loadFromStorage() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (token && userId) {
        this.user = { id: parseInt(userId), username: 'User' }
        this.isAuthenticated = true
      }
    },
  },
})
