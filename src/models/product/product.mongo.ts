import { Schema, model } from "mongoose"
import { Product } from "../../types/product"

const productSchema = new Schema<Product>({
  name: {
    type: String,
    trim: true,
    required: true
  },
  images: [
    {
      type: String,
      trim: true
    }
  ],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  reducedPrice: {
    type: Number,
    min: 0
  },
  shortDescription: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    content: {
      type: String,
      trim: true
    },
    ingredients: {
      type: String,
      trim: true
    },
    advantages: {
      type: String,
      trim: true
    },
    storage: {
      type: String,
      trim: true
    },
    nutritionValues: [
      {
        label: String,
        text: String
      }
    ]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories"
  },
  onPromotion: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  barCode: {
    type: String,
    trim: true
  },
  productCode: {
    type: String,
    trim: true
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  }
})

productSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

productSchema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

export default model("Products", productSchema)
