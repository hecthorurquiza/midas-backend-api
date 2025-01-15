import { Request, Response } from 'express'
import { ValidateRecoverCodeUseCase } from './ValidateRecoverCodeUseCase'
import { badRequest, notFound, ok } from '~/utils/httpResponse'

export class ValidateRecoverCodeController {
  constructor(
    private readonly validateRecoverCodeUseCase: ValidateRecoverCodeUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, recover_code } = req.body

    if (!email) return badRequest(res, 'Email é obrigatório')
    if (!recover_code) return badRequest(res, 'Código de recuperação é obrigatório')

    try {
      const token = await this.validateRecoverCodeUseCase.execute(email, recover_code)
      return ok(res, token)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return badRequest(res, error.message)
    }
  }
}