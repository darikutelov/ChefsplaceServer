import { Schema, model } from "mongoose"
import { Order } from "../../types/order"

const orderSchema = new Schema<Order>({
  orderNumber: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  created: {
    type: Date,
    default: Date.now
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products"
      },
      name: {
        type: String
      },
      image: {
        type: String
      },
      price: {
        type: Number,
        requried: true,
        min: 0
      },
      quantity: {
        type: Number,
        requried: true,
        min: 0
      },
      weight: {
        type: Number,
        requried: true,
        min: 0
      }
    }
  ],
  deliveryCharge: {
    type: Number,
    default: 0,
    min: 0
  },
  deliveryAddressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  invoiceAddressId: {
    type: Schema.Types.ObjectId,
    ref: "Address"
  },
  payment: {
    type: String,
    enum: ["0", "1", "2", "3"],
    default: "0"
  },
  note: {
    type: String
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "AWAITINGPAYMENT", "COMPLETED", "CANCELLED"],
    default: "PENDING"
  }
})

orderSchema.pre("save", async function (next) {
  const currentNumberOfOrders = await Order.countDocuments()
  this.orderNumber = currentNumberOfOrders + 1

  next()
})

orderSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

orderSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

const Order = model("Order", orderSchema)
module.exports = Order
