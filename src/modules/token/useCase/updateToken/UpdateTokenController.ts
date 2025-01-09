import { Request, Response } from 'express'
import { UpdateTokenUseCase } from './UpdateTokenUseCase'
import { badRequest, conflict, internalServerError, notFound, ok } from '~/utils/httpResponse'
import { toTitleCase } from '~/utils/toTitleCase'

export class UpdateTokenController {
  constructor(private readonly updateTokenUseCase: UpdateTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { new_token } = req.body

    if (!new_token) return badRequest(res, 'Token é obrigatório')

    try {
      const token = await this.updateTokenUseCase.execute(id, toTitleCase(new_token))
      return ok(res, token)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('já cadastrado')) return conflict(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}