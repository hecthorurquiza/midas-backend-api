import { ITokenRepository } from '../../repositories/ITokenRepository'

interface IToken {
  id: string
  token: string
}

export class GetTokenUseCase {
  constructor(private readonly tokenRepository: ITokenRepository) {}

  async execute(id: string): Promise<IToken> {
    const token = await this.tokenRepository.findOne({ id: id })
    if (!token) throw new Error(`Token de id = ${id} não encontrado`)

    return {
      id: token.id,
      token: token.token
    }
  }
}