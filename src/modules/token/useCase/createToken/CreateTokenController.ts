import { Request, Response } from 'express'
import { CreateTokenUseCase } from './CreateTokenUseCase'
import { ICreateTokenRequestDTO } from './CreateTokenDTO'
import { toTitleCase } from '~/utils/toTitleCase'

export class CreateTokenController {
  constructor(
    private readonly createTokenUseCase: CreateTokenUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const bodyReq = req.body as ICreateTokenRequestDTO

    if (!bodyReq.token) return res.status(400).json({ error: 'Token é obrigatório' })
    if (!bodyReq.user_id) return res.status(400).json({ error: 'ID do usuário é obrigatório' })

    try {
      const token = await this.createTokenUseCase.execute({
        token: toTitleCase(bodyReq.token),
        user_id: bodyReq.user_id
      })
      return res.status(201).json(token)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return res.status(409).json({ error: error.message })
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}