import { Request, Response } from 'express'
import { UpdateGroupUseCase } from './UpdateGroupUseCase'
import { badRequest, conflict, internalServerError, notFound, ok } from '~/utils/httpResponse'
import { toTitleCase } from '~/utils/toTitleCase'

export class UpdateGroupController {
  constructor(private updateGroupUseCase: UpdateGroupUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name } = req.body
    const { userId } = req.query

    if (!name) return badRequest(res, 'Nome é obrigatório')
    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const group = await this.updateGroupUseCase.execute(id, toTitleCase(name), userId as string)
      return ok(res, group)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('já registrado')) return conflict(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}