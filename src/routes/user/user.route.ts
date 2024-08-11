import express from "express"

const userRouter = express.Router()
import auth from "../../middleware/auth"

import {
  httpRegisterUser,
  httpLoginUser,
  httpGetProfile
  // httpCreateDeliveryAddress,
  // httpEditDeliveryAddress,
  // httpDeleteDeliveryAddress,
  // httpAddCartItem,
  // httpUpdateCartItem,
  // httpRemoveCartItem,
  // httpCreateInvoiceAddress,
  // httpEditInvoiceAddress,
  // httpDeleteInvoiceAddress
} from "./user.controller"

userRouter.post("/register", httpRegisterUser)
userRouter.post("/login", httpLoginUser)
userRouter.get("/", auth(), httpGetProfile)

//Delivery Addresses
// userRouter.post("/:id/delivery-address", auth, httpCreateDeliveryAddress)
// userRouter.post(
//   "/:id/delivery-address/:addressId",
//   auth,
//   httpEditDeliveryAddress
// )
//userRouter.delete("/:id/delivery-address/:addressId", httpDeleteDeliveryAddress)
//Invoice Addresses
// userRouter.post("/:id/invoice-address", httpCreateInvoiceAddress)
// userRouter.post("/:id/invoice-address/:addressId", httpEditInvoiceAddress)
// userRouter.delete("/:id/invoice-address/:addressId", httpDeleteInvoiceAddress)

//Cart
// userRouter.post("/:userId/cart", httpAddCartItem)
// userRouter.post("/:userId/cart/:cartItemId", httpUpdateCartItem)
// userRouter.delete("/:userId/cart/:cartItemId", httpRemoveCartItem)

export default userRouter
