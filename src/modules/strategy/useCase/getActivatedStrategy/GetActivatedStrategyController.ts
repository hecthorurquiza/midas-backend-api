import { Request, Response } from 'express'
import { GetActivatedStrategyUseCase } from './GetActivatedStrategyUseCase'
import { badRequest, notFound, ok } from '~/utils/httpResponse'

export class GetActivatedStrategyController {
  constructor(
    private readonly getActivatedStrategyUseCase: GetActivatedStrategyUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário não informado')

    try {
      const strategy = await this.getActivatedStrategyUseCase.execute(userId as string)
      return ok(res, strategy)
    }
    catch (error: any) {
      return notFound(res, error.message)
    }
  }
}