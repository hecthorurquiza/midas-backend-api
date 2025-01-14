import { Request, Response } from 'express'
import { CreateGroupUseCase } from './CreateGroupUseCase'
import { ICreateGroupRequestDTO } from './CreateGroupDTO'
import { badRequest, conflict, created, internalServerError, notFound } from '~/utils/httpResponse'
import { toTitleCase } from '~/utils/toTitleCase'

export class CreateGroupController {
  constructor(private readonly createGroupUseCase: CreateGroupUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as ICreateGroupRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome é obrigatório')
    if (!bodyReq.user_id) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const group = await this.createGroupUseCase.execute({
        name: toTitleCase(bodyReq.name),
        user_id: bodyReq.user_id
      })
      return created(res, group)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('já registrado')) return conflict(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}