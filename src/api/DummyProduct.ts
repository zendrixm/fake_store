import axios from 'axios'
import { DUMMY_API_BASE } from '@/constants/APIConstants'

/**
 * Fetches all dummy products from dummy API.
 *
 * @returns {Promise<Object[]>} An array of objects with dummy product data
 */
export const fetchDummyProducts = async () => {
  const response = await axios.get(`${DUMMY_API_BASE}/products`)
  return response.data
}

/**
 * Fetches a single dummy product by its ID from dummy API.
 *
 * @param {number} productId The ID of the product to fetch
 * @returns {Promise<Object>} An object with dummy product data
 */

export const fetchSingleProduct = async (productId: number) => {
  const response = await axios.get(`${DUMMY_API_BASE}/products/${productId}`)
  return response.data
}

/**
 * Searches for dummy products matching the given search query from dummy API.
 *
 * @param {number} product The search query to search for
 * @returns {Promise<Object[]>} An array of objects with dummy product data
 */
export const fetchSearchProduct = async (product: string) => {
  const response = await axios.get(`${DUMMY_API_BASE}/products/search?q=${product}`)
  return response.data
}

/**
 * Fetches the list of product categories from dummy API.
 *
 * @returns {Promise<string[]>} An array of strings with category names
 */

export const fetchProductCategories = async () => {
  const response = await axios.get(`${DUMMY_API_BASE}/products/categories`)
  return response.data
}

/**
 * Fetches a list of product categories from dummy API.
 *
 * @returns {Promise<string[]>} An array of strings with category names
 */
export const fetchCategoryList = async () => {
  const response = await axios.get(`${DUMMY_API_BASE}/products/category-list`)
  return response.data
}

/**
 * Fetches a list of dummy products from dummy API under a given category.
 *
 * @param {string} category The category name to fetch products from
 * @returns {Promise<Object[]>} An array of objects with dummy product data
 */
export const fetchCategoryLists = async (category: string) => {
  const response = await axios.get(`${DUMMY_API_BASE}/products/category/${category}`)
  return response.data
}

export const fetchProductsByCategory = async (category: string) => {
  const response = await axios.get(`${DUMMY_API_BASE}/products/category/${category}`)
  return response.data
}
