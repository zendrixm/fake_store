import axios from 'axios'
import { API_BASE } from '@/constants/APIConstants'

export const userLogin = async (username: string, password: string) => {
  return axios.post(`${API_BASE}/auth/login`, {
    username,
    password,
  })
}

export const fetchAllUsers = async () => {
  return axios.get(`${API_BASE}/users`)
}
