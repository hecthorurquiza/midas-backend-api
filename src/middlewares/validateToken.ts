import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { notAcceptable, unauthorized } from '~/utils/httpResponse'

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return unauthorized(res)

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    next()
  }
  catch (error: any) {
    console.log('Token inválido ', error)
    return notAcceptable(res, 'Token inválido')
  }
}