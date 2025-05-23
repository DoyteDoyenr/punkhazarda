import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { env } from '@/lib/env'

interface UserToken extends jwt.JwtPayload {
  user: User
}

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET || '') as UserToken

    res.locals.token = { id: decodedToken.userId }
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token!' })
  }
}
