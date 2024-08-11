import { Document } from "mongoose"

export type Address = Document & {
  id?: string
  name: string
  firstName: string
  lastName: string
  company?: string
  eik?: string
  vatNumber?: boolean
  phoneNumber: string
  city: string
  postCode: string
  addressLine: string
  addressLine2?: string
  isDefault?: boolean
}
