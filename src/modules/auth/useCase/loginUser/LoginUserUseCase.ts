import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { ILoginUserRequestDTO, ILoginUserResponseDTO } from './LoginUserDTO'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class LoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const user = await this.validateData(data)
    const token = this.generateJwtToken(user.email)

    return {
      token,
      user_id: user.id,
      user_email: user.email
    }
  }

  private async validateData(data: ILoginUserRequestDTO) {
    const user = await this.userRepository.findOne({ email: data.email })
    if (!user) throw new Error(`Usuário não encontrado com o email ${data.email}`)

    const isValidPassword = bcryptjs.compareSync(data.password, user.password)
    if (!isValidPassword) throw new Error('Senha incorreta')

    return user
  }

  private generateJwtToken(email: string) {
    return jwt.sign({
      data: email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, process.env.JWT_SECRET as string)
  }
}