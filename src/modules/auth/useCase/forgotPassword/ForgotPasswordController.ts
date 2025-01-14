import { Request, Response } from 'express'
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    if (!email) return badRequest(res, 'Email é obrigatório')

    try {
      await this.forgotPasswordUseCase.execute(email)
      return ok(res, { message: 'Código de recuperação enviado' })
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}