import { Request, Response } from 'express'
import { DeleteSiteUseCase } from './DeleteSiteUseCase'
import { internalServerError, noContent, notFound } from '~/utils/httpResponse'

export class DeleteSiteController {
  constructor(private readonly deleteSiteUseCase: DeleteSiteUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.deleteSiteUseCase.execute(id)
      return noContent(res)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}