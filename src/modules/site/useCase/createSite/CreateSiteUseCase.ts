import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { Site } from '../../entities/Site'
import { ISiteRepository } from '../../repositories/ISiteRepository'
import { ICreateSiteRequestDTO, ICreateSiteResponseDTO } from './CreateSiteDTO'

export class CreateSiteUseCase {
  constructor(
    private readonly siteRepository: ISiteRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: ICreateSiteRequestDTO): Promise<ICreateSiteResponseDTO> {
    await this.validateData(data)
    const site = await this.createSite(data)

    return {
      id: site.id,
      name: site.name,
      url_address: site.urlAddress,
      user_id: site.userId
    }
  }

  private async validateData(data: ICreateSiteRequestDTO) {
    const [nameAlreadyExists, urlAlreadyExists, user] = await Promise.all([
      this.siteRepository.findOne({ name: data.name, userId: data.user_id }),
      this.siteRepository.findOne({ urlAddress: data.url_address, userId: data.user_id }),
      this.userRepository.findOne({ id: data.user_id })
    ])

    if (nameAlreadyExists) throw new Error('Nome já cadastrado')
    if (urlAlreadyExists) throw new Error('URL já cadastrada')
    if (!user) throw new Error(`Usuário de id = ${data.user_id} não encontrado`)
  }

  private async createSite(data: ICreateSiteRequestDTO) {
    const site = await this.siteRepository.create(
      new Site({
        name: data.name,
        urlAddress: data.url_address,
        userId: data.user_id
      })
    )
    if (!site) throw new Error('Erro ao cadastrar site')

    return site
  }
}