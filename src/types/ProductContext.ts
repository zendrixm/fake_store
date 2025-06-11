export interface DummyProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barCode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
  brand: string
  total: number
  skip: number
  limit: number
}

export interface DummyCartProduct {
  id: number
  products: [
    {
      id: number
      title?: string
      price?: number
      quantity: number
      total?: number
      discountPercentage?: number
      discountedTotal?: number
      thumbnail?: string
    },
  ]
  total?: number
  discountedTotal?: number
  userId?: number
  totalProducts?: number
  totalQuantity?: number
  deletedOn?: string
  isDeleted?: boolean
}

export interface ProductSpecification {
  label: string
  value: string
  showDivider?: boolean
}

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedTotal: number
  thumbnail: string
}
