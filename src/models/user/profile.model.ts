import { User as UserType } from "../../types/user"
import User from "./user.mongo"
import Address from "../address/address.mongo"

async function createProfile(
  uid: string,
  email: string
): Promise<UserType | null> {
  return await User.create({ uid, email })
}

async function findUserByEmail(email: string): Promise<UserType | null> {
  return await User.findOne({ email }, { __v: 0 }).populate([
    "deliveryAddress",
    "invoiceAddress"
  ])
}

async function findProfileById(id: string): Promise<UserType | null> {
  return await User.findById(id, { __v: 0 }).populate([
    "deliveryAddress",
    "invoiceAddress"
  ])
}

export { createProfile, findUserByEmail, findProfileById }
