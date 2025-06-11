import axios from 'axios'
import { DUMMY_API_BASE } from '@/constants/APIConstants'

export const getCartByUser = async (userId: number) => {
  const response = await axios.get(`${DUMMY_API_BASE}/carts/${userId}`)
  return response.data || null
}

export const addToCart = async (cartData: {
  userId: number
  products: { id: number; quantity: number }[]
}) => {
  const response = await axios.post(`${DUMMY_API_BASE}/carts/add`, cartData)
  return response.data
}

export const updateCart = async (
  cartId: number,
  updatedData: { merge: boolean; products: { id: number; quantity: number }[] },
) => {
  const response = await axios.put(`${DUMMY_API_BASE}/carts/${cartId}`, updatedData)
  return response.data
}

export async function getCartById(cartId: number) {
  const res = await fetch(`${DUMMY_API_BASE}/carts/${cartId}`)
  return await res.json()
}
