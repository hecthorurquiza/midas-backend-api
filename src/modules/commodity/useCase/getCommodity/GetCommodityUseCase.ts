import { ICommodityRepository } from '../../repositories/ICommodityRepository'
import { IGetCommodityResponseDTO } from './GetCommodityDTO'

export class GetCommodityUseCase {
  constructor(private readonly commodityRepository: ICommodityRepository) {}

  async execute(id: string): Promise<IGetCommodityResponseDTO> {
    const commodity = await this.commodityRepository.findOne({ id})
    if (!commodity) throw new Error(`Commodity de id = ${id} não encontrado`)

    return {
      id: commodity.id,
      name: commodity.name,
      code: commodity.code
    }
  }
}