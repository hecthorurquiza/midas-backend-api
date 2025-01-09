import { Request, Response } from 'express'
import { GetUserSitesUseCase } from './GetUserSitesUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class GetUserSitesController {
  constructor(private readonly getUserSitesUseCase: GetUserSitesUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const sites = await this.getUserSitesUseCase.execute(userId as string)
      return ok(res, sites)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}