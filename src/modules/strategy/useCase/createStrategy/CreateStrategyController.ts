import { Request, Response } from 'express'
import { CreateStrategyUseCase } from './CreateStrategyUseCase'
import { ICreateStrategyRequestDTO } from './CreateStrategyDTO'
import { badRequest, conflict, created, internalServerError, notFound } from '~/utils/httpResponse'
import { toTitleCase } from '~/utils/toTitleCase'

export class CreateStrategyController {
  constructor(
    private readonly createStrategyUseCase: CreateStrategyUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as ICreateStrategyRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome é obrigatório')
    if (!bodyReq.commodity_id) return badRequest(res, 'ID do commodity é obrigatório')
    if (!bodyReq.user_id) return badRequest(res, 'ID do usuário é obrigatório')
    if (!bodyReq.sites_ids || bodyReq.sites_ids.length === 0) return badRequest(res, 'Pelo menos um site é obrigatório')
    if (!bodyReq.tokens_ids || bodyReq.tokens_ids.length === 0) return badRequest(res, 'Pelo menos um token é obrigatório')

    try {
      const strategy = await this.createStrategyUseCase.execute({
        ...bodyReq,
        name: toTitleCase(bodyReq.name)
      })
      return created(res, strategy)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('já registrado')) return conflict(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}