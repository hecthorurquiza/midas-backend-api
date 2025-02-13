import { ISiteRepository } from '../../repositories/ISiteRepository'
import { IGetSiteResponseDTO } from './GetSiteDTO'

export class GetSiteUseCase {
  constructor(private readonly siteRepository: ISiteRepository) {}

  async execute(id: string): Promise<IGetSiteResponseDTO> {
    const site = await this.siteRepository.findOne({ id })
    if (!site) throw new Error(`Site de id = ${id} não encontrado`)

    return {
      id: site.id,
      name: site.name,
      url: site.urlAddress
    }
  }
}