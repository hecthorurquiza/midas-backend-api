import { Request, Response } from 'express'
import { ActivateStrategyUseCase } from './ActivateStrategyUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class ActivateStrategyController {
  constructor(private readonly activateStrategyUseCase: ActivateStrategyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { userId } = req.query

    if (!userId) return badRequest(res, 'ID do usuário não informado')

    try {
      await this.activateStrategyUseCase.execute(id, userId as string)
      return ok(res, { message: 'Estratégia ativada com sucesso' })
    }
    catch (error: any) {
      if (error.message.includes('não encontrada')) return notFound(res, error.message)
      if (error.message.includes('ativada')) return badRequest(res, error.message)
      if (error.message.includes('não autorizado')) return badRequest(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}