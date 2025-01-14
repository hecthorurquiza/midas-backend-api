import { Request, Response } from 'express'
import { GetUserGroupsUseCase } from './GetUserGroupsUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class GetUserGroupsController {
  constructor(private readonly getUserGroupsUseCase: GetUserGroupsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const userGroups = await this.getUserGroupsUseCase.execute(userId as string)
      return ok(res, userGroups)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}