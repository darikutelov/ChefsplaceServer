import { Category } from "../../types/category"
import categories from "./category.mongo"

async function getCategories() {
  return await categories.find({}, { __v: 0 }).sort({ position: 1 })
}

async function saveCategory(category: Category) {
  try {
    const categoriesCount = await categories.estimatedDocumentCount()
    let { name, imageUrl, position } = category

    if (!position) {
      position = categoriesCount + 1
    }

    const { upsertedCount, modifiedCount } = await categories.updateOne(
      { name },
      { imageUrl, position },
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

export { getCategories, saveCategory }
