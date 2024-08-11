import express from "express"

const categoriesRouter = express.Router()

import { httpGetAllCategories, httpSaveCategory } from "./categories.controller"

categoriesRouter.get("/", httpGetAllCategories)
categoriesRouter.post("/", httpSaveCategory)

export default categoriesRouter
