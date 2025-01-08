import { ISiteRepository } from '../../repositories/ISiteRepository'

export class DeleteSiteUseCase {
  constructor(private readonly siteRepository: ISiteRepository) {}

  async execute(siteId: string): Promise<void> {
    const site = await this.siteRepository.findOne({ id: siteId })
    if (!site) throw new Error(`Site de id = ${siteId} não encontrado`)

    const deleted = await this.siteRepository.delete(siteId)
    if (!deleted) throw new Error('Erro ao deletar site')
  }
}