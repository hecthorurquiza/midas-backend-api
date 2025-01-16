import { Request, Response } from 'express'
import { GetUserCommoditiesUseCase } from './GetUserCommoditiesUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class GetUserCommoditiesController {
  constructor(private readonly getUserCommoditiesUseCase: GetUserCommoditiesUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const commodities = await this.getUserCommoditiesUseCase.execute(userId as string)
      return ok(res, commodities)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}