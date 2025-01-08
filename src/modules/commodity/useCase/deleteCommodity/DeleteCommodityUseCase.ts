import { ICommodityRepository } from '../../repositories/ICommodityRepository'

export class DeleteCommodityUseCase {
  constructor(private readonly commodityRepository: ICommodityRepository) {}

  async execute(id: string): Promise<void> {
    const commodity = await this.commodityRepository.findOne({ id })
    if (!commodity) throw new Error(`Commodity de id = ${id} não encontrado`)

    const deleted = await this.commodityRepository.delete(commodity.id)
    if (!deleted) throw new Error('Erro ao deletar commodity')
  }
}