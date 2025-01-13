import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { Token } from '../../entities/Token'
import { ITokenRepository } from '../../repositories/ITokenRepository'
import { ICreateTokenRequestDTO, ICreateTokenResponseDTO } from './CreateTokenDTO'

export class CreateTokenUseCase {
  constructor(
    private readonly tokenRepository: ITokenRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: ICreateTokenRequestDTO): Promise<ICreateTokenResponseDTO> {
    await this.validateData(data)
    const token = await this.createToken(data)

    return {
      id: token.id,
      token: token.token,
      user_id: token.userId,
    }
  }

  private async validateData(data: ICreateTokenRequestDTO) {
    const [token, user] = await Promise.all([
      this.tokenRepository.findOne({ token: data.token, userId: data.user_id }),
      this.userRepository.findOne({ id: data.user_id })
    ])

    if (token) throw new Error('Token já cadastrado')
    if (!user) throw new Error(`Usuário de id = ${data.user_id} não encontrado`)
  }

  private async createToken(data: ICreateTokenRequestDTO) {
    const token = await this.tokenRepository.create(
      new Token({
        token: data.token,
        userId: data.user_id
      })
    )
    if (!token) throw new Error('Erro ao criar token')

    return token
  }
}