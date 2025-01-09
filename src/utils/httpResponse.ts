import { Response } from 'express'

export function ok(res: Response, data: any) {
  return res.json(data)
}

export function created(res: Response, data: any) {
  return res.status(201).json(data)
}

export function noContent(res: Response) {
  return res.status(204).send()
}

export function badRequest(res: Response, message: string) {
  return res.status(400).json({ error: message })
}

export function unauthorized(res: Response) {
  return res.status(401).send()
}

export function notFound(res: Response, message: string) {
  return res.status(404).json({ error: message })
}

export function notAcceptable(res: Response, message: string) {
  return res.status(406).json({ error: message })
}

export function conflict(res: Response, message: string) {
  return res.status(409).json({ error: message })
}

export function internalServerError(res: Response, message: string) {
  return res.status(500).json({ error: message })
}
