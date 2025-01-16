import { Request, Response } from 'express'
import { CreateCommodityUseCase } from './CreateCommodityUseCase'
import { ICreateCommodityRequestDTO } from './CreateCommodityDTO'
import { badRequest, conflict, created, internalServerError, notFound } from '~/utils/httpResponse'

export class CreateCommodityController {
  constructor(private createCommodityUseCase: CreateCommodityUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as ICreateCommodityRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome da commodity é obrigatório')
    if (!bodyReq.code) return badRequest(res, 'Código da commodity é obrigatório')
    if (!bodyReq.user_id) return badRequest(res, 'ID do usuário é obrigatório')

    try {
      const commodity = await this.createCommodityUseCase.execute({
        name: bodyReq.name.toUpperCase(),
        code: bodyReq.code.toUpperCase(),
        user_id: bodyReq.user_id
      })
      return created(res, commodity)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return conflict(res, error.message)
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}