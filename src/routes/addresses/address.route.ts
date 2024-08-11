import express from "express"

import { httpCreateGuestDeliveryAddress } from "./address.controller"

const addressRouter = express.Router()

addressRouter.post("/guest-delivery", httpCreateGuestDeliveryAddress)

export default addressRouter
