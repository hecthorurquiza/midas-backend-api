import { Request, Response } from 'express'
import { DeleteTokenUseCase } from './DeleteTokenUseCase'
import { internalServerError, noContent, notFound } from '~/utils/httpResponse'

export class DeleteTokenController {
  constructor(private readonly deleteTokenUseCase: DeleteTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.deleteTokenUseCase.execute(id)
      return noContent(res)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}