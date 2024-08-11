import { Document, Schema } from "mongoose"
import { Request } from "express"

export type User = Document & {
  id?: string
  uid?: string
  email: string
  created: Date
  isAdmin: boolean
  orders: [Schema.Types.ObjectId]
  deliveryAddress: [Schema.Types.ObjectId]
  invoiceAddress: [Schema.Types.ObjectId]
  cart: Cart[]
}

export type Cart = {
  productId: Schema.Types.ObjectId
  quantity: number
}

export type TokenData = {
  id: string
  email: string
  uid: string
  iat: number
  exp: number
}

export interface AuthenticatedRequest extends Request {
  tokenData?: TokenData
}
