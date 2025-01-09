import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { ITokenRepository } from '../../repositories/ITokenRepository'
import { IGetUserTokensResponseDTO } from './GetUserTokensDTO'
import { Token } from '../../entities/Token'

export class GetUserTokensUseCase {
  constructor(
    private readonly tokenRepository: ITokenRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserTokensResponseDTO> {
    const tokens = await this.validateData(userId)
    const tokensMapped = this.mapTokens(tokens)

    return { tokens: tokensMapped }
  }

  private async validateData(userId: string) {
    const [user, tokens] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.tokenRepository.findManyByUserId(userId)
    ])

    if (!user) throw new Error(`Usuário de id = ${userId} não encontrado`)
    if (!tokens) throw new Error('Erro ao buscar tokens do usuário')

    return tokens
  }

  private mapTokens(tokens: Token[]) {
    return tokens.map(token => ({
      id: token.id,
      token: token.token
    }))
  }
}