import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const createReq = req.body as ICreateUserRequestDTO

    if (!createReq.first_name) return res.status(400).json({ error: 'Nome é obrigatório' })
    if (!createReq.last_name) return res.status(400).json({ error: 'Sobrenome é obrigatório' })
    if (!createReq.email) return res.status(400).json({ error: 'Email é obrigatório' })
    if (!createReq.phone) return res.status(400).json({ error: 'Telefone é obrigatório' })
    if (!createReq.password) return res.status(400).json({ error: 'Senha é obrigatória' })

    try {
      const user = await this.createUserUseCase.execute({
        ...createReq,
        phone: createReq.phone.replace(/\D/g, '')
      })
      return res.status(201).json(user)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrado')) return res.status(409).json({ error: error.message })
      return res.status(400).json({ error: error.message })
    }
  }
}