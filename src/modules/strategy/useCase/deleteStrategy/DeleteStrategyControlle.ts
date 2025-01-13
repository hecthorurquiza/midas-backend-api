import { Request, Response } from 'express'
import { DeleteStrategyUseCase } from './DeleteStrategyUseCase'
import { internalServerError, noContent, notFound } from '~/utils/httpResponse'

export class DeleteStrategyController {
  constructor(private readonly deleteStrategyUseCase: DeleteStrategyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.deleteStrategyUseCase.execute(id)
      return noContent(res)
    }
    catch (error: any) {
      if (error.message.includes('não encontrada')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}