import { Schema, model } from "mongoose"
import { User } from "../../types/user"

const userSchema = new Schema<User>({
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  deliveryAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address"
    }
  ],
  invoiceAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address"
    }
  ],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, min: 1, required: true }
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  }
})

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

userSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

export default model("User", userSchema)
