import { Request, Response } from 'express'
import { GetUserTokensUseCase } from './GetUserTokensUseCase'

export class GetUserTokensController {
  constructor(private readonly getUserTokensUseCase: GetUserTokensUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query

    if (!userId) return res.status(400).json({ error: 'ID do usuário é obrigatório' })

    try {
      const tokens = await this.getUserTokensUseCase.execute(userId as string)
      return res.status(200).json(tokens)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}