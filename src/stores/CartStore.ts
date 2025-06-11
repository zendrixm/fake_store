import { defineStore } from 'pinia'
import { getCartByUser, getCartById, addToCart, updateCart } from '@/api/Cart'
import type { DummyCartProduct, CartItem } from '@/types/ProductContext'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: null as DummyCartProduct | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // Helper to persist cart in localStorage
    persistCart(cart: DummyCartProduct) {
      localStorage.setItem('cartId', String(cart.id))
      localStorage.setItem('cartData', JSON.stringify(cart))
    },

    async fetchCart(userId: number) {
      this.loading = true
      try {
        const localCartData = localStorage.getItem('cartData')
        if (localCartData) {
          this.cart = JSON.parse(localCartData)
          return
        }

        const storedId = localStorage.getItem('cartId')
        const res = storedId ? await getCartById(Number(storedId)) : await getCartByUser(userId)

        this.cart = res
        this.persistCart(res)
        console.log('Fetched cart:', this.cart)
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },

    async addToCart(userId: number, newProduct: { id: number; quantity: number }) {
      this.loading = true
      try {
        // Ensure we have a cart or create/fetch it
        if (!this.cart) {
          try {
            const existingCart = await getCartByUser(userId)
            if (existingCart?.id) {
              this.cart = existingCart
              this.persistCart(existingCart)
            }
          } catch {
            const res = await addToCart({ userId, products: [newProduct] })
            this.cart = res
            this.persistCart(res)
            return
          }
        }

        // If still no cart, create one
        if (!this.cart) {
          const res = await addToCart({ userId, products: [newProduct] })
          this.cart = res
          this.persistCart(res)
          return
        }

        // Merge logic: check existing
        const existingProduct = this.cart.products.find((p) => p.id === newProduct.id)
        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity
          // Update via PUT
          const res = await updateCart(this.cart.id, {
            merge: true,
            products: this.cart.products.map((p) => ({ id: p.id, quantity: p.quantity })),
          })
          this.cart = res
          this.persistCart(res)
        } else {
          // Add new via POST, then merge returned products
          const res = await addToCart({ userId, products: [newProduct] })

          // Merge res.products into this.cart.products
          if (res.products && Array.isArray(res.products)) {
            res.products.forEach((p: CartItem) => {
              const exist = this.cart!.products.find((x) => x.id === p.id)
              if (exist) {
                exist.quantity = p.quantity
              } else {
                this.cart!.products.push({
                  id: p.id,
                  title: p.title,
                  price: p.price,
                  quantity: p.quantity,
                  total: p.total,
                  discountedTotal: p.discountedTotal,
                  thumbnail: p.thumbnail,
                })
              }
            })
          }

          // Update metadata if present
          if (res.total !== undefined) this.cart.total = res.total
          if (res.discountedTotal !== undefined) this.cart.discountedTotal = res.discountedTotal
          if (res.totalProducts !== undefined) this.cart.totalProducts = res.totalProducts
          if (res.totalQuantity !== undefined) this.cart.totalQuantity = res.totalQuantity

          this.persistCart(this.cart!)
        }
      } catch (err) {
        console.error('Add to cart failed:', err)
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },
    async updateCartQuantity(updatedProduct: { id: number; quantity: number }) {
      if (!this.cart) return
      this.loading = true
      try {
        const product = this.cart.products.find((p) => p.id === updatedProduct.id)
        if (!product) {
          console.warn(`Product with ID ${updatedProduct.id} not found in cart.`)
          return
        }

        product.quantity = updatedProduct.quantity

        const res = await updateCart(this.cart.id, {
          merge: true,
          products: this.cart.products.map((p) => ({
            id: p.id,
            quantity: p.quantity,
          })),
        })

        this.cart = res
        this.persistCart(res)
      } catch (err) {
        console.error('Failed to update product quantity:', err)
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },

    async removeProduct(productId: number) {
      if (!this.cart) return
      this.loading = true
      try {
        // 1. Remove locally
        const productIndex = this.cart.products.findIndex((p) => p.id === productId)
        if (productIndex >= 0) {
          this.cart.products.splice(productIndex, 1)
        }
        // 2. Send “update” to DummyJSON
        const res = await updateCart(this.cart.id, {
          merge: true,
          products: this.cart.products.map((p) => ({
            id: p.id,
            quantity: p.quantity,
          })),
        })

        // 3. Update local state and persist
        this.cart = res
        this.persistCart(res)
      } catch (err) {
        console.error('Failed to remove product:', err)
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },

    // Optional: simulate a checkout by clearing the cart
    async checkout() {
      if (!this.cart) return
      this.loading = true
      try {
        // Simulate order success
        this.cart = null
        localStorage.removeItem('cartId')
        localStorage.removeItem('cartData')
      } catch (err) {
        this.error = String(err)
      } finally {
        this.loading = false
      }
    },
  },
})
