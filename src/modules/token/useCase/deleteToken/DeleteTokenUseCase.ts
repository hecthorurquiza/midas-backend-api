import { ITokenRepository } from '../../repositories/ITokenRepository'

export class DeleteTokenUseCase {
  constructor(private readonly tokenRepository: ITokenRepository) {}

  async execute(tokenId: string): Promise<void> {
    const token = await this.tokenRepository.findOne({ id: tokenId })
    if (!token) throw new Error(`Token de id = ${tokenId} não encontrado`)

    const deleted = await this.tokenRepository.delete(token.id)
    if (!deleted) throw new Error('Erro ao deletar token')
  }
}