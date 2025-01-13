import { Request, Response } from 'express'
import { UpdateStrategyUseCase } from './UpdateStrategyUseCase'
import { IUpdateStrategyRequestDTO } from './UpdateStrategyDTO'
import { badRequest, conflict, internalServerError, notFound, ok } from '~/utils/httpResponse'
import { toTitleCase } from '~/utils/toTitleCase'

export class UpdateStrategyController {
  constructor(private readonly updateStrategyUseCase: UpdateStrategyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const bodyReq = req.body as IUpdateStrategyRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome é obrigatório')
    if (!bodyReq.commodity_id) return badRequest(res, 'ID do commodity é obrigatório')
    if (!bodyReq.sites_ids || bodyReq.sites_ids.length === 0) return badRequest(res, 'Pelo menos um site é obrigatório')
    if (!bodyReq.tokens_ids || bodyReq.tokens_ids.length === 0) return badRequest(res, 'Pelo menos um token é obrigatório')

    try {
      const strategy = await this.updateStrategyUseCase.execute(id, {
        ...bodyReq,
        name: toTitleCase(bodyReq.name),
      })
      return ok(res, strategy)
    }
    catch (error: any) {
      if (error.message.includes('não encontrad')) return notFound(res, error.message)
      if (error.message.includes('já registrad')) return conflict(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}