import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { ISiteRepository } from '../../repositories/ISiteRepository'
import { IGetUserSitesResponseDTO } from './GetUserSitesDTO'
import { Site } from '../../entities/Site'

export class GetUserSitesUseCase {
  constructor(
    private readonly siteRepository: ISiteRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserSitesResponseDTO> {
    const sites = await this.validateData(userId)
    const sitesMapped = this.mapSites(sites)

    return { sites: sitesMapped }
  }

  private async validateData(userId: string) {
    const [ user, sites] = await Promise.all([
      this.userRepository.findOne({ id: userId}),
      this.siteRepository.findManyByUserId(userId)
    ])

    if (!user) throw new Error(`Usuário de id = ${userId} não encontrado`)
    if (!sites) throw new Error('Erro ao buscar sites do usuário')

    return sites
  }

  private mapSites(sites: Site[]) {
    return sites.map(site => ({
      id: site.id,
      name: site.name,
      url : site.urlAddress
    }))
  }
}