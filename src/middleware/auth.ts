import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"
import { AuthenticatedRequest, TokenData } from "../types/user"

const Auth = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
      return res.status(403).send("Нужен е токен за достъп!")
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      req.tokenData = decoded as TokenData
    } catch (err) {
      return res.status(401).send("Невалидна ауторизация!")
    }

    next()
  }
}

export default Auth
