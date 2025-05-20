export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image?: string
  rating?: {
    rate?: number
    count?: number
  }
}

export interface CartItem {
  productId: number
  quantity: number
}

export interface Cart {
  id: number
  userId: number
  date: string
  products: CartItem[]
}

// ✅ Final CartProduct
export interface CartProduct extends Product {
  quantity: number
}
