import { Request, Response } from 'express'
import { GetUserSitesUseCase } from './GetUserSitesUseCase'

export class GetUserSitesController {
  constructor(private readonly getUserSitesUseCase: GetUserSitesUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.query

    if (!userId) return res.status(400).json({ error: 'ID do usuário é obrigatório' })

    try {
      const sites = await this.getUserSitesUseCase.execute(userId as string)
      return res.status(200).json(sites)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}