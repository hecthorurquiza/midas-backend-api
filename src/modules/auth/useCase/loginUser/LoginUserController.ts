import { Request, Response } from 'express'
import { LoginUserUseCase } from './LoginUserUseCase'
import { ILoginUserRequestDTO } from './LoginUserDTO'

export class LoginUserController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const bodyReq = req.body as ILoginUserRequestDTO

    if (!bodyReq.email) return res.status(400).json({ error: 'Email é obrigatório' })
    if (!bodyReq.password) return res.status(400).json({ error: 'Senha é obrigatório' })

    try {
      const login = await this.loginUserUseCase.execute(bodyReq)
      return res.status(200).json(login)
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      if (error.message.includes('incorreta')) return res.status(400).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}