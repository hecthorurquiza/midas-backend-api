import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { badRequest, conflict, created, internalServerError } from '~/utils/httpResponse'

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const createReq = req.body as ICreateUserRequestDTO

    if (!createReq.first_name) return badRequest(res, 'Nome é obrigatório')
    if (!createReq.last_name) return badRequest(res, 'Sobrenome é obrigatório')
    if (!createReq.email) return badRequest(res, 'Email é obrigatório')
    if (!createReq.phone) return badRequest(res, 'Telefone é obrigatório')
    if (!createReq.password) return badRequest(res, 'Senha é obrigatória')

    try {
      const user = await this.createUserUseCase.execute({
        ...createReq,
        phone: createReq.phone.replace(/\D/g, '')
      })
      return created(res, user)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return conflict(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}