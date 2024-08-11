import { Document, Schema } from "mongoose"

export type Product = Document & {
  id?: string
  name: string
  images: string[]
  price: number
  reducedPrice?: number
  shortDescription: string
  description?: {
    content?: string
    ingredients?: string
    advantages?: string
    storage?: string
    nutritionValues?: NutritionValues[]
  }
  category: Schema.Types.ObjectId
  onPromotion: boolean
  created: Date
  barCode: string
  productCode: string
  weight: number
}

type NutritionValues = {
  label: string
  text: string
}

export type Pagination = {
  currentPage: number
  countPerPage: number
  totalPages: number
  totalCount: number
}
