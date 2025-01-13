import { Site } from '../../entities/Site'
import { ISiteRepository } from '../../repositories/ISiteRepository'
import { IUpdateSiteRequestDTO, IUpdateSiteResponseDTO } from './UpdateSiteDTO'

export class UpdateSiteUseCase {
  constructor(private readonly siteRepository: ISiteRepository) {}

  async execute(id: string, userId: string, data: IUpdateSiteRequestDTO): Promise<IUpdateSiteResponseDTO> {
    const site = await this.validateData(id, userId, data)
    await this.updateSite(site, data)

    return {
      id: site.id,
      name: site.name,
      url_address: site.urlAddress,
      user_id: site.userId
    }
  }

  private async validateData(id: string, userId: string, data: IUpdateSiteRequestDTO) {
    const [site, nameAlreadyExists, urlAlreadyExists] = await Promise.all([
      this.siteRepository.findOne({ id }),
      this.siteRepository.findOne({ name: data.name, userId}),
      this.siteRepository.findOne({ urlAddress: data.url_address, userId })
    ])

    if (!site) throw new Error(`Site de id = ${id} não encontrado`)
    if (nameAlreadyExists && nameAlreadyExists.id !== id) throw new Error('Nome já cadastrado')
    if (urlAlreadyExists && urlAlreadyExists.id !== id) throw new Error('URL já cadastrada')

    return site
  }

  private async updateSite(site: Site, data: IUpdateSiteRequestDTO) {
    site.update(data.name, data.url_address)
    const updated = await this.siteRepository.update(site)
    if (!updated) throw new Error('Erro ao atualizar site')
  }
}