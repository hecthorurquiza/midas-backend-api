import { Request, Response } from 'express'
import { ChangePasswordUseCase } from './ChangePasswordUseCase'
import { IChangePasswordRequestDTO } from './ChangePasswordDTO'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class ChangePasswordController {
  constructor(
    private readonly changePasswordUseCase: ChangePasswordUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as IChangePasswordRequestDTO

    if (!bodyReq.email) return badRequest(res, 'Email é obrigatório')
    if (!bodyReq.new_password) return badRequest(res, 'Nova senha é obrigatória')
    if (!bodyReq.confirm_password) return badRequest(res, 'Confirmar senha é obrigatório')
    if (bodyReq.new_password !== bodyReq.confirm_password) return badRequest(res, 'As senhas não coincidem')

    try {
      await this.changePasswordUseCase.execute(bodyReq)
      return ok(res, { message: 'Senha alterada com sucesso' })
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('não pode ser igual')) return badRequest(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}