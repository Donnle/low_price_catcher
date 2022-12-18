export interface Response<T> {
  data: T
  success: boolean
  error?: string
}

export interface PlatformHomeInfo {
  link: string
  image: string
  text: string
  isComingSoon?: boolean
  position?: 'left' | 'center' | 'right'
}

export interface Products {
  [key: number]: Product
}

export interface Product {
  id: number
  name: string
  date: Date
  link: string
  category: string
  mainImage: string
  categoryValue: string
  customName?: string
  oldPrice?: number
  currentPrice?: number
}

export interface ProductFromLinkResponse {
  title: string
  price: number
  category: string
  mainImage: string
}

export interface CategoryFilter {
  title: string
  value: string
}

export interface SimpleOption {
  title: string
  value: string
}

export interface PriceFilter {
  min: number
  max: number
}
