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

export interface CartProduct {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}
