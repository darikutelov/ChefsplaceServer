import express from "express"

// routers
import categoriesRouter from "./categories/categories.route"
import productsRouter from "./products/products.route"
import userRouter from "./user/user.route"
import addressRouter from "./addresses/address.route"

const api = express.Router()

// Register routes
api.use("/categories", categoriesRouter)
api.use("/products", productsRouter)
api.use("/users", userRouter)
api.use("/addresses", addressRouter)

export { api }
