import { Request, Response } from 'express'
import { GetCommodityUseCase } from './GetCommodityUseCase'
import { notFound, ok } from '~/utils/httpResponse'

export class GetCommodityController {
  constructor(private readonly getCommodityUseCase: GetCommodityUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    try {
      const commodity = await this.getCommodityUseCase.execute(id)
      return ok(response, commodity)
    }
    catch (error: any) {
      return notFound(response, error.message)
    }
  }
}