import { Schema, model } from "mongoose"
import { Address } from "../../types/address"

const addressSchema = new Schema<Address>({
  name: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  eik: {
    type: String,
    trim: true
  },
  vatNumber: {
    type: Boolean,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  postCode: {
    type: String,
    trim: true
  },
  addressLine: {
    type: String,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  isDefault: {
    type: Boolean
  }
})

addressSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

addressSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

export default model("Address", addressSchema)
