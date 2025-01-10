import { Request, Response } from 'express'
import { GetUserStrategiesUseCase } from './GetUserStrategiesUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class GetUserStrategiesController {
  constructor(
    private readonly getUserStrategiesUseCase: GetUserStrategiesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const strategies = await this.getUserStrategiesUseCase.execute(userId as string)
      return ok(res, strategies)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}