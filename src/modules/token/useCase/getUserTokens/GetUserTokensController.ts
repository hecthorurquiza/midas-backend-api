import { Request, Response } from 'express'
import { GetUserTokensUseCase } from './GetUserTokensUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class GetUserTokensController {
  constructor(private readonly getUserTokensUseCase: GetUserTokensUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const tokens = await this.getUserTokensUseCase.execute(userId as string)
      return ok(res, tokens)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}