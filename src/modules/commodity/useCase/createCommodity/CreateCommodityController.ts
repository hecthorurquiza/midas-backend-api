import { Request, Response } from 'express'
import { CreateCommodityUseCase } from './CreateCommodityUseCase'
import { ICreateCommodityRequestDTO } from './CreateCommodityDTO'

export class CreateCommodityController {
  constructor(private createCommodityUseCase: CreateCommodityUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as ICreateCommodityRequestDTO

    if (!bodyReq.name) return res.status(400).json({ error: 'Nome da commodity é obrigatório' })
    if (!bodyReq.code) return res.status(400).json({ error: 'Código da commodity é obrigatório' })
    if (!bodyReq.user_id) return res.status(400).json({ error: 'ID do usuário é obrigatório' })

    try {
      const commodity = await this.createCommodityUseCase.execute({
        name: bodyReq.name.toUpperCase(),
        code: bodyReq.code.toUpperCase(),
        user_id: bodyReq.user_id
      })
      return res.status(201).json(commodity)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return res.status(409).json({ error: error.message })
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ message: error.message })
    }
  }
}