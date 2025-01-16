import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { badRequest, notAcceptable } from '~/utils/httpResponse'

export function validateRecoverToken(req: Request, res: Response, next: NextFunction) {
  const { recoverToken } = req.query

  if (!recoverToken) return badRequest(res, 'Token de recuperação não informado')

  try {
    jwt.verify(recoverToken as string, process.env.JWT_SECRET as string)
    next()
  }
  catch (error: any) {
    console.log('Token inválido ', error)
    return notAcceptable(res, 'Token inválido')
  }
}