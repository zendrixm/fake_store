import { defineStore } from 'pinia'
import { userSignup, userLogin, fetchAllUsers } from '@/api/Auth'
import type { User, SignUpUser, UserProfile } from '@/types/UserContext'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | User,
    userProfile: null as UserProfile | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
    listOfUsers: [] as UserProfile[],
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
        // Fetch all users just to find the one matching the provided username.
        // This is NOT secure and should never be done in a production environment.
        const { data: users } = await fetchAllUsers()
        const foundUser = (users as User[]).find((user) => user.username === username)

        if (!foundUser) throw new Error('User not found')
        if (foundUser.password !== password) throw new Error('Incorrect password')

        const { data: loginData }: { data: { token: string } } = await userLogin(username, password)

        if (!loginData?.token) throw new Error('Login failed')

        this.user = { id: foundUser.id, username: foundUser.username }
        this.isAuthenticated = true
        localStorage.setItem('token', loginData.token)
        localStorage.setItem('userId', foundUser.id.toString())
        localStorage.setItem('username', foundUser.username)

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
    async fetchUserProfile() {
      if (!this.user?.id) return

      try {
        const { data: users } = await fetchAllUsers()
        const profile = (users as UserProfile[]).find((u) => u.id === this.user?.id)
        this.userProfile = profile || null
      } catch (err) {
        console.error('Failed to fetch full profile:', err)
        this.userProfile = null
      }
    },

    async fetchListOfUsers() {
      try {
        const { data: users } = await fetchAllUsers()
        this.listOfUsers = users as UserProfile[]
      } catch (err) {
        console.error('Failed to fetch list of users:', err)
        this.listOfUsers = []
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
    },
    loadFromStorage() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const username = localStorage.getItem('username')

      if (token && userId && username) {
        this.user = { id: parseInt(userId), username }
        this.isAuthenticated = true
      }
    },
  },
})
