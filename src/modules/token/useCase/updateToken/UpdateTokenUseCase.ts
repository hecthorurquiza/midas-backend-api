import { Token } from '../../entities/Token'
import { ITokenRepository } from '../../repositories/ITokenRepository'
import { IUpdateTokenResponseDTO } from './UpdateTokenDTO'

export class UpdateTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(tokenId: string, newToken: string): Promise<IUpdateTokenResponseDTO> {
    const token = await this.validateData(tokenId, newToken)
    await this.updateToken(token, newToken)

    return {
      id: token.id,
      token: token.token,
      user_id: token.userId
    }
  }

  private async validateData(tokenId: string, newToken: string) {
    const [token, tokenAlreadyExists] = await Promise.all([
      this.tokenRepository.findOne({ id: tokenId }),
      this.tokenRepository.findOne({ token: newToken })
    ])

    if (!token) throw new Error(`Token de id = ${tokenId} não encontrado`)
    if (tokenAlreadyExists && tokenAlreadyExists.id !== tokenId) throw new Error('Token já cadastrado')

    return token
  }

  private async updateToken(token: Token, newToken: string) {
    token.update(newToken)
    const updated = await this.tokenRepository.update(token)
    if (!updated) throw new Error('Erro ao atualizar token')
  }
}