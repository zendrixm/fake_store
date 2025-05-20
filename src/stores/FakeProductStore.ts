import { defineStore } from 'pinia'
import type { Cart, CartProduct, Product } from '@/types/ProductContext'
import axios from 'axios'
import { API_BASE } from '@/constants/APIConstants'

interface State {
  products: Product[]
  cartList: CartProduct[]
  product: Product | null
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  isCartFetched: boolean
}

export const useProductStore = defineStore('product', {
  state: (): State => ({
    products: [],
    cartList: [],
    product: null,
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: '',
    isCartFetched: false,
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

    async fetchCart(userId: number, force = false) {
      if (this.isCartFetched && !force) return // prevent repeated overwrites

      this.loading = true
      try {
        const res = await axios.get<Cart[]>(`${API_BASE}/carts/user/${userId}`)
        const userCarts = res.data
        const latestCart = userCarts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0]

        if (!latestCart) {
          this.cartList = []
          return
        }

        const productDetailsPromises = latestCart.products.map(async (item) => {
          const productRes = await axios.get<Product>(`${API_BASE}/products/${item.productId}`)
          return {
            ...productRes.data,
            quantity: item.quantity,
          }
        })

        this.cartList = await Promise.all(productDetailsPromises)
        this.isCartFetched = true
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },

    async addToCartAndSync(userId: number, product: Product, quantity: number) {
      this.loading = true
      try {
        // Make sure latest cart is fetched
        if (!this.isCartFetched) {
          await this.fetchCart(userId)
        }

        const res = await axios.get<Cart[]>(`${API_BASE}/carts/user/${userId}`)
        const userCarts = res.data
        const latestCart = userCarts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0]

        const existingIndex = this.cartList.findIndex((p) => p.id === product.id)
        if (existingIndex !== -1) {
          this.cartList[existingIndex].quantity += quantity
        } else {
          this.cartList.push({ ...product, quantity })
        }

        const cartProducts = this.cartList.map((p) => ({
          productId: p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          image: p.image,
          quantity: p.quantity,
        }))

        const payload = {
          userId,
          products: cartProducts,
        }

        if (latestCart) {
          await axios.put(`${API_BASE}/carts/${latestCart.id}`, payload)
        } else {
          await axios.post(`${API_BASE}/carts`, payload)
        }
      } catch (err) {
        this.error = (err as Error).message
        console.error('Error syncing cart:', err)
      } finally {
        this.loading = false
      }
    },

    async removeFromCartAndSync(userId: number, productId: number) {
      this.cartList = this.cartList.filter((p) => p.id !== productId)

      const cartProducts = this.cartList.map((p) => ({
        productId: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        quantity: p.quantity,
      }))

      const payload = {
        userId,
        products: cartProducts,
      }

      const res = await axios.get<Cart[]>(`${API_BASE}/carts/user/${userId}`)
      const latestCart = res.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0]

      if (latestCart) {
        await axios.put(`${API_BASE}/carts/${latestCart.id}`, payload)
      } else {
        await axios.post(`${API_BASE}/carts`, payload)
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
