import { Address as AddressType } from "../../types/address"
import Address from "./address.mongo"

async function createGuestAddress(address: AddressType) {
  return await Address.create(address)
}

export { createGuestAddress }
