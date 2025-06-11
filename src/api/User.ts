import axios from 'axios'
import { DUMMY_API_BASE } from '@/constants/APIConstants'

/**
 * Logs in with the given username and password.
 *
 * @param {string} username The username to log in with.
 * @param {string} password The password to log in with.
 * @returns {Promise<Object>} A promise that resolves with the response data which
 * contains the token and user info.
 */
export const userLogin = async (username: string, password: string) => {
  const response = await axios.post(`${DUMMY_API_BASE}/auth/login`, {
    username,
    password,
  })
  return response.data
}

export const fetchAllUsers = async () => {
  const response = await axios.get(`${DUMMY_API_BASE}/users`)
  return response.data
}

export const fetchCurrentUser = async (userId: number) => {
  const response = await axios.get(`${DUMMY_API_BASE}/user/${userId}`)
  return response.data
}
