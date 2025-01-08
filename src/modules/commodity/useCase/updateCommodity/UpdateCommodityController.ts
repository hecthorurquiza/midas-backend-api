import { Request, Response } from 'express'
import { UpdateCommodityUseCase } from './UpdateCommodityUseCase'
import { IUpdateCommodityRequestDTO } from './UpdateCommodityDTO'

export class UpdateCommodityController {
  constructor(private readonly updateCommodityUseCase: UpdateCommodityUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const bodyReq = req.body as IUpdateCommodityRequestDTO

    if (!bodyReq.name) return res.status(400).json({ error: 'Nome é obrigatório' })
    if (!bodyReq.code) return res.status(400).json({ error: 'Código é obrigatório' })

    try {
      const commodity = await this.updateCommodityUseCase.execute(id, bodyReq)
      return res.status(200).json(commodity)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return res.status(409).json({ error: error.message })
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}