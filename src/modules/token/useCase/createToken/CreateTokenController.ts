import { Request, Response } from 'express'
import { CreateTokenUseCase } from './CreateTokenUseCase'
import { ICreateTokenRequestDTO } from './CreateTokenDTO'
import { toTitleCase } from '~/utils/toTitleCase'
import { badRequest, conflict, created, internalServerError, notFound } from '~/utils/httpResponse'

export class CreateTokenController {
  constructor(
    private readonly createTokenUseCase: CreateTokenUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const bodyReq = req.body as ICreateTokenRequestDTO

    if (!bodyReq.token) return badRequest(res, 'Token é obrigatório')
    if (!bodyReq.user_id) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const token = await this.createTokenUseCase.execute({
        token: toTitleCase(bodyReq.token),
        user_id: bodyReq.user_id
      })
      return created(res, token)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return conflict(res, error.message)
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}