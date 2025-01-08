import { Request, Response } from 'express'
import { UpdateSiteUseCase } from './UpdateSiteUseCase'
import { IUpdateSiteRequestDTO } from './UpdateSiteDTO'

export class UpdateSiteController {
  constructor(private readonly updateSiteUseCase: UpdateSiteUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const bodyReq = req.body as IUpdateSiteRequestDTO

    if (!bodyReq.name) return res.status(400).json({ error: 'Nome da commodity é obrigatório' })
    if (!bodyReq.url_address) return res.status(400).json({ error: 'URL é obrigatório' })

    const isValidUrl = this.validateUrl(bodyReq.url_address)
    if (!isValidUrl) return res.status(400).json({ error: 'URL inválida' })

    try {
      const site = await this.updateSiteUseCase.execute(id, {
        ...bodyReq,
        name: bodyReq.name.toUpperCase()
      })
      return res.status(200).send(site)
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