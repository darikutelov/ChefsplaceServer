import { Request, Response } from "express"
import {
  getProducts,
  saveProduct,
  getProductById
} from "../../models/product/product.model"
import { Product, Pagination } from "../../types/product"

async function httpGetProducts(req: Request, res: Response) {
  try {
    const { page, limit, ...query } = req.query
    const currentPage = parseInt(page as string)
    const limitPage = parseInt(limit as string)
    const data: { products: Product[]; pagination: Pagination } =
      await getProducts({ page: currentPage, limit: limitPage, query })
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
    let errorMessage = error instanceof Error ? error.message : String(error)
    return res.status(400).json({ error: errorMessage })
  }
}

async function httpGetPromoProducts(req: Request, res: Response) {
  try {
    const promoProducts = await getProducts({ query: { onPromotion: true } })
    res.status(200).json(promoProducts)
  } catch (error) {
    console.log(error)
    let errorMessage = error instanceof Error ? error.message : String(error)
    return res.status(400).json({ error: errorMessage })
  }
}

async function httpGetProductById(req: Request, res: Response) {
  try {
    const id = req.params.id
    return res.status(200).json(await getProductById(id))
  } catch (error) {
    console.log(error)
    let errorMessage = error instanceof Error ? error.message : String(error)
    return res.status(400).json({ error: errorMessage })
  }
}

async function httpSaveProduct(req: Request, res: Response) {
  try {
    const { product } = req.body
    return res.status(200).json(await saveProduct(product))
  } catch (error) {
    console.log(error)
    let errorMessage = error instanceof Error ? error.message : String(error)
    return res.status(400).json({ error: errorMessage })
  }
}

export {
  httpGetProducts,
  httpSaveProduct,
  httpGetProductById,
  httpGetPromoProducts
}
