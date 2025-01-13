import { Request, Response } from 'express'
import { UpdateCommodityUseCase } from './UpdateCommodityUseCase'
import { IUpdateCommodityRequestDTO } from './UpdateCommodityDTO'
import { badRequest, conflict, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class UpdateCommodityController {
  constructor(private readonly updateCommodityUseCase: UpdateCommodityUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { userId } = req.query
    const bodyReq = req.body as IUpdateCommodityRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome é obrigatório')
    if (!bodyReq.code) return badRequest(res, 'Código é obrigatório')

    try {
      const commodity = await this.updateCommodityUseCase.execute(id, userId as string, {
        name: bodyReq.name.toUpperCase(),
        code: bodyReq.code.toUpperCase()
      })
      return ok(res, commodity)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return conflict(res, error.message)
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}