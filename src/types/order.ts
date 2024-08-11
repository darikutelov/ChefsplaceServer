import { Document, Schema } from "mongoose"

export type Order = Document & {
  id?: string
  orderNumber: number
  userId: Schema.Types.ObjectId
  created: Date
  items: string[]
  deliveryCharge: number
  deliveryAddressId: Schema.Types.ObjectId
  invoiceAddressId: Schema.Types.ObjectId
  payment: string
  note: string
  status: string
}
