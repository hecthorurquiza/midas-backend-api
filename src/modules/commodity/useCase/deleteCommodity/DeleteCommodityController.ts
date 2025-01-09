import { Request, Response } from 'express'
import { DeleteCommodityUseCase } from './DeleteCommodityUseCase'
import { internalServerError, noContent, notFound } from '~/utils/httpResponse'

export class DeleteCommodityController {
  constructor(private readonly deleteCommodityUseCase: DeleteCommodityUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.deleteCommodityUseCase.execute(id)
      return noContent(res)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }

  }
}