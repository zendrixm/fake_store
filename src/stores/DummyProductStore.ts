import { defineStore } from 'pinia'
import type { DummyProduct } from '@/types/ProductContext'
import {
  fetchDummyProducts,
  fetchSingleProduct,
  fetchSearchProduct,
  fetchCategoryList,
  fetchProductsByCategory,
} from '@/api/DummyProduct'

export const useProductStore = defineStore('product', {
  state: () => ({
    dummyProducts: [] as DummyProduct[],
    singleProduct: {} as DummyProduct | null,
    searchProduct: [] as DummyProduct[],
    categories: [] as string[],
    selectedCategory: '' as string,
    productsCategorized: [] as DummyProduct[],
  }),

  actions: {
    async fetchAllProducts() {
      try {
        const res = await fetchDummyProducts()
        this.dummyProducts = res.products
        console.log('Fetched products:', this.dummyProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },

    async fetchSingleProductDetails(productId: number) {
      try {
        const product = await fetchSingleProduct(productId)
        this.singleProduct = product
      } catch (error) {
        console.error('Error fetching single product:', error)
      }
    },

    async searchProducts(query: string) {
      try {
        const results = await fetchSearchProduct(query)
        this.searchProduct = results.products
      } catch (error) {
        console.error('Error searching products:', error)
      }
    },

    async fetchProductCategories() {
      try {
        const data = await fetchCategoryList()
        this.categories = data
        console.log('Fetched product categories:', this.categories)
      } catch (error) {
        console.error('Error fetching product categories:', error)
        return []
      }
    },
    async fetchProductsByCategory(category: string) {
      try {
        const data = await fetchProductsByCategory(category)
        this.productsCategorized = data.products
        this.selectedCategory = category
      } catch (error) {
        console.error('Error fetching products by category:', error)
      }
    },
  },
  getters: {
    getDummyProduct: (state) => state.dummyProducts,
    getSingleProduct: (state) => state.singleProduct,
    getSearchProduct: (state) => state.searchProduct,
    getCategories: (state) => state.categories,
    getDummyProducts: (state) => {
      if (state.selectedCategory) {
        return state.productsCategorized
      } else if (state.searchProduct.length > 0) {
        return state.searchProduct
      } else {
        return state.dummyProducts
      }
    },
  },
})
