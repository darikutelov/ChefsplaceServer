import { Document } from "mongoose"

export type Category = Document & {
  id?: string
  name: string
  imageUrl: string
  position: number
}
