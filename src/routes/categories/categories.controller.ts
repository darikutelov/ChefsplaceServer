import { Request, Response } from "express"

import {
  getCategories,
  saveCategory
} from "../../models/category/category.model"

async function httpGetAllCategories(req: Request, res: Response) {
  let categories = await getCategories()
  return res.status(200).json({ categories })
}

async function httpSaveCategory(req: Request, res: Response) {
  const { category } = req.body
  return res.status(200).json(await saveCategory(category))
}

export { httpGetAllCategories, httpSaveCategory }
