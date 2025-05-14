import { defineStore } from 'pinia'
import type { Product } from '@/types/ProductContext'
import axios from 'axios'
import { API_BASE } from '@/constants/APIConstants'

interface State {
  products: Product[]
  product: Product | null
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
}

export const useProductStore = defineStore('product', {
  state: (): State => ({
    products: [],
    product: null,
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: '',
  }),

  getters: {
    filteredProducts: (state) => {
      return state.products.filter((p) => {
        const matchesCategory = state.selectedCategory
          ? p.category === state.selectedCategory
          : true

        const matchesSearch = state.searchQuery
          ? p.title.toLowerCase().includes(state.searchQuery.toLowerCase())
          : true

        return matchesCategory && matchesSearch
      })
    },
  },
  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await axios.get<Product[]>(`${API_BASE}/products`)
        this.products = res.data
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id: number) {
      this.loading = true
      try {
        const res = await axios.get<Product>(`${API_BASE}/products/${id}`)
        this.product = res.data
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData: Partial<Product>) {
      try {
        await axios.post(`${API_BASE}/products`, productData)
        await this.fetchProducts()
      } catch (err) {
        console.error(err)
      }
    },

    async updateProduct(id: number, productData: Partial<Product>) {
      try {
        await axios.put(`${API_BASE}/products/${id}`, productData)
        await this.fetchProducts()
      } catch (err) {
        console.error(err)
      }
    },

    async deleteProduct(id: number) {
      try {
        await axios.delete(`${API_BASE}/products/${id}`)
        await this.fetchProducts()
      } catch (err) {
        console.error(err)
      }
    },
  },
})
