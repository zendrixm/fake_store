import { defineStore } from 'pinia'
import { userLogin, fetchAllUsers, fetchCurrentUser } from '@/api/User'
import type { DummyUsers, DummyUser } from '@/types/UserContext'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    user: {} as DummyUsers,
    accessToken: '',
    allUser: [] as DummyUser[],
    userDetails: {} as DummyUser,
    authenticated: false,
  }),
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const data = await userLogin(username, password)
        console.log('Data from userLogin:', data)
        this.user = data
        this.accessToken = data.accessToken
        if (data.accessToken) {
          this.authenticated = true
        }
        localStorage.setItem('token', this.accessToken)
        localStorage.setItem('userId', data.id)
        localStorage.setItem('username', data.username)
        return data
      } catch (err) {
        console.error('loginUser failed:', err)
        this.authenticated = false
        throw err
      }
    },
    async fetchAllUsers() {
      try {
        const data = await fetchAllUsers()
        this.allUser = data.users || []
        console.log('Fetched all users:', this.allUser)
        return data
      } catch (err) {
        console.error('fetchAllUsers failed:', err)
        throw err
      }
    },
    async fetchActiveUser(userId: number) {
      try {
        const response = await fetchCurrentUser(userId)
        console.log('Fetched current user:', response)
        this.userDetails = response
        return response
      } catch (err) {
        console.error('fetchActiveUser failed:', err)
        throw err
      }
    },

    async logoutUser() {
      try {
        this.user = {} as DummyUsers
        this.accessToken = ''
        this.authenticated = false
        localStorage.removeItem('token')
      } catch (err) {
        console.error('logoutUser failed:', err)
        throw err
      }
    },
    loadFromStorage() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const username = localStorage.getItem('username')
      if (token && userId && username) {
        this.accessToken = token
        this.user.id = parseInt(userId)
        this.user.username = username
      } else {
        this.accessToken = ''
      }
    },
  },
})
