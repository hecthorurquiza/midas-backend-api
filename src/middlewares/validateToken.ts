import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).send()

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET as string)
    console.log('Token válido ', payLoad)
    next()
  }
  catch (error: any) {
    console.log('Token inválido ', error)
    return res.status(406).send({ error: 'Token inválido' })
  }
}