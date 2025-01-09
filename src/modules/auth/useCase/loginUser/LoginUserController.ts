import { Request, Response } from 'express'
import { LoginUserUseCase } from './LoginUserUseCase'
import { ILoginUserRequestDTO } from './LoginUserDTO'
import { badRequest, internalServerError, notFound, ok } from '~/utils/httpResponse'

export class LoginUserController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as ILoginUserRequestDTO

    if (!bodyReq.email) return badRequest(res, 'Email é obrigatório')
    if (!bodyReq.password) return badRequest(res, 'Senha é obrigatória')

    try {
      const login = await this.loginUserUseCase.execute(bodyReq)
      return ok(res, login)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      if (error.message.includes('incorreta')) return badRequest(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}