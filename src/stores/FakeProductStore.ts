import { defineStore } from 'pinia'
import type { Product } from '@/interface/ProductContext'
import axios from 'axios'

interface State {
  products: Product[]
  product: Product | null
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): State => ({
    products: [],
    product: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await axios.get<Product[]>('https://fakestoreapi.com/products')
        this.products = res.data
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },
  },
})
