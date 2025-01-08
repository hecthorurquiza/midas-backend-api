import { Request, Response } from 'express'
import { CreateSiteUseCase } from './CreateSiteUseCase'
import { ICreateSiteRequestDTO } from './CreateSiteDTO'

export class CreateSiteController {
  constructor(private readonly createSiteUseCase: CreateSiteUseCase) {}

  async handle(req: Request, res: Response) {
    const bodyReq = req.body as ICreateSiteRequestDTO

    if (!bodyReq.name) return res.status(400).json({ error: 'Nome é obrigatório' })
    if (!bodyReq.url_address) return res.status(400).json({ error: 'URL é obrigatório' })

    const isValidUrl = this.validateUrl(bodyReq.url_address)
    if (!isValidUrl) return res.status(400).json({ error: 'URL inválida' })

    try {
      const site = await this.createSiteUseCase.execute({
        ...bodyReq,
        name: bodyReq.name.toUpperCase(),
      })
      return res.status(201).json(site)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrad')) return res.status(409).json({ error: error.message })
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }

  private validateUrl(url: string) {
    try {
      new URL(url)
      return true
    }
    catch (error: any) {
      console.log(error.message)
      return false
    }
  }
}