import { Request, Response } from "express"
import { createGuestAddress } from "../../models/address/address.model"

async function httpCreateGuestDeliveryAddress(req: Request, res: Response) {
  const { address } = req.body

  if (!address) {
    return res.status(400).json({ error: "Няма данни за адрес!" })
  }

  //TODO: check if all required fields are filled and valid

  try {
    return res.status(201).json(await createGuestAddress(address))
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}

export { httpCreateGuestDeliveryAddress }
