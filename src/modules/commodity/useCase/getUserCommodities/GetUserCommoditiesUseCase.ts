import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { ICommodityRepository } from '../../repositories/ICommodityRepository'
import { IGetUserCommoditiesResponseDTO } from './GetUserCommoditiesDTO'
import { Commodity } from '@prisma/client'

export class GetUserCommoditiesUseCase {
  constructor(
    private readonly commodityRepository: ICommodityRepository,
    private readonly userRepositoy: IUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserCommoditiesResponseDTO> {
    const commodities = await this.validateData(userId)
    const commoditiesMapped = this.mapCommodities(commodities)

    return { commodities: commoditiesMapped }
  }

  private async validateData(userId: string) {
    const user = await this.userRepositoy.findOne({ id: userId })
    if (!user) throw new Error(`Usuário de id = ${userId} não encontrado`)

    const commodities = await this.commodityRepository.findManyByUserId(userId)
    if (!commodities) throw new Error('Erro na busca de commodities do usuário')

    return commodities
  }

  private mapCommodities(commodities: Commodity[]) {
    return commodities.map(commodity => ({
      id: commodity.id,
      name: commodity.name,
      code: commodity.code
    }))
  }
}