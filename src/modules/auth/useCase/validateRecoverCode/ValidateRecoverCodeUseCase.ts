import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { getCurrentDate } from '~/utils/getDate'
import jwt from 'jsonwebtoken'

export class ValidateRecoverCodeUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(email: string, recoverCode: string): Promise<{ recover_token: string }> {
    const user = await this.userRepository.findOne({ email })
    if (!user) throw new Error('Email não encontrado na base de dados')
    if (!user.code || user.code !== recoverCode) throw new Error('Código de recuperação inválido')
    if (!user.expireIn || getCurrentDate() > user.expireIn) throw new Error('Código de recuperação expirado')

    return { recover_token: this.generateJwtToken(email) }
  }

  private generateJwtToken(email: string) {
    return jwt.sign({
      data: email,
      exp: Math.floor(Date.now() / 1000) + (60 * 300)
    }, process.env.JWT_SECRET as string)
  }
}