import express from "express"

const productsRouter = express.Router()

import {
  httpGetProducts,
  httpSaveProduct,
  httpGetProductById,
  httpGetPromoProducts
} from "./products.controller"

productsRouter.get("/", httpGetProducts)
productsRouter.get("/promo", httpGetPromoProducts)
productsRouter.get("/:id", httpGetProductById)
productsRouter.post("/", httpSaveProduct)

export default productsRouter
