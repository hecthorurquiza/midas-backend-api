import { Request, Response } from 'express'
import { DeleteGroupUseCase } from './DeleteGroupUseCase'
import { badRequest, forbidden, internalServerError, noContent, notFound } from '~/utils/httpResponse'

export class DeleteGroupController {
  constructor(private readonly deleteGroupUseCase: DeleteGroupUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      await this.deleteGroupUseCase.execute(id, userId as string)
      return noContent(res)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('permissão')) return forbidden(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}