import { Request, Response } from 'express'
import { GetUserCommoditiesUseCase } from './GetUserCommoditiesUseCase'

export class GetUserCommoditiesController {
  constructor(private readonly getUserCommoditiesUseCase: GetUserCommoditiesUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.query

    if (!userId) return res.status(400).json({ error: 'ID do usuário é obrigatório' })

    try {
      const commodities = await this.getUserCommoditiesUseCase.execute(userId as string)
      return res.status(200).json(commodities)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}