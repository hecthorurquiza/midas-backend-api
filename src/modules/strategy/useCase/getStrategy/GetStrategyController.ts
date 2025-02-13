import { Request, Response } from 'express'
import { GetStrategyUseCase } from './GetStrategyUseCase'
import { notFound } from '~/utils/httpResponse'

export class GetStrategyController {
  constructor(
    private getStrategyUseCase: GetStrategyUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    try {
      const strategy = await this.getStrategyUseCase.execute(id)
      return response.status(200).json(strategy)
    }
    catch (error: any) {
      return notFound(response, error.message)
    }
  }
}