import { Product, Pagination } from "../../types/product"
import Products from "./product.mongo"

type GetProductsProps = {
  page?: number
  limit?: number
  query?: {
    [key: string]: any
  }
}

async function getProducts({
  page = 1,
  limit,
  query = {}
}: GetProductsProps): Promise<{ products: Product[]; pagination: Pagination }> {
  const count: number = await Products.countDocuments(query)

  if (limit == undefined) {
    limit = count
  }

  if (isNaN(page) || isNaN(limit)) {
    page = 1
    limit = count
  }

  const skip = (page - 1) * limit
  const totalPages = Math.ceil(count / limit)

  const products = await Products.find(query, {
    name: 1,
    images: 1,
    category: 1,
    price: 1,
    reducedPrice: 1,
    onPromotion: 1,
    weight: 1
  })
    .populate("category")
    .sort({ created: -1 })
    .skip(skip)
    .limit(limit)
    .then((docs) => docs.map((doc) => doc.toObject() as Product))

  const pagination = {
    currentPage: page,
    countPerPage: limit,
    totalPages,
    totalCount: count
  }

  return { products, pagination }
}

async function getProductById(id: string) {
  let product = await Products.findById({ _id: id }, { __v: 0 }).populate(
    "category"
  )
  return product
}

async function saveProduct(product: Product) {
  const { name } = product
  try {
    const { upsertedCount, modifiedCount } = await Products.updateOne(
      { name },
      { ...product },
      {
        upsert: true
      }
    )
    return {
      success: !!(upsertedCount || modifiedCount)
    }
  } catch (error) {
    console.log(error)
  }
}

export { getProducts, getProductById, saveProduct }
