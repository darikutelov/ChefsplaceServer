import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import {
  createProfile,
  findUserByEmail,
  findProfileById
} from "../../models/user/profile.model"
import { AuthenticatedRequest, User } from "../../types/user"

async function httpGetProfile(req: AuthenticatedRequest, res: Response) {
  if (!req.tokenData) {
    return res
      .status(401)
      .json({ error: "Трябва да влезете във вашия профил отново" })
  }

  const { id, uid, email } = req.tokenData

  try {
    const profile = await findProfileById(id)

    if (profile) {
      if (profile.uid !== uid || profile.email !== email) {
        return res
          .status(401)
          .json({ error: "Грешка при автентикация. Моля влезте отново" })
      }

      profile.uid = undefined
      return res.status(200).json(profile)
    } else {
      return res.status(400).json({ error: "Няма такъв профил!" })
    }
  } catch (error) {
    return res.status(400).json({ error: "Грешка при намиране на профила!" })
  }
}

async function httpRegisterUser(req: Request, res: Response) {
  console.log("🎯")
  const { uid, email } = req.body

  if (!(email && uid)) {
    return res.status(400).send("Липсва имейл или потребителски номер!")
  }

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    return res.status(409).send("Потребител с този имейл вече съществува!")
  }

  try {
    const encryptedUid = await bcrypt.hash(uid, 10)
    const newUser = await createProfile(encryptedUid, email)

    if (newUser) {
      newUser.uid = undefined
      res.cookie("AuthToken", getToken(newUser))
      return res.status(201).json(newUser)
    } else {
      return res.status(400).json({ error: "Грешка. Опитай отново!" })
    }
  } catch (error) {
    console.log("😱", error)
    res.status(400).send(error)
  }
}

async function httpLoginUser(req: Request, res: Response) {
  console.log("🎯")
  const { uid, email } = req.body

  if (!(email && uid)) {
    return res.status(400).send("All input is required")
  }

  //TODO: Handle when jwt has expired
  try {
    const user = await findUserByEmail(email)

    if (user && user.uid && (await bcrypt.compare(uid, user.uid))) {
      res.cookie("AuthToken", getToken(user))
      user.uid = undefined
      return res.status(200).json(user)
    }

    res.status(400).send("Invalid Credentials")
  } catch (error) {
    console.log("😱", error)
    res.status(400).send(error)
  }
}

// Creates and returns a JWT token from _id, uid and email
function getToken(user: User): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set")
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      uid: user.uid
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "60d"
    }
  )
}

export { httpRegisterUser, httpLoginUser, httpGetProfile }
