import { Commodity } from '../../entities/Commodity'
import { ICommodityRepository } from '../../repositories/ICommodityRepository'
import { IUpdateCommodityRequestDTO, IUpdateCommodityResponseDTO } from './UpdateCommodityDTO'

export class UpdateCommodityUseCase {
  constructor(private readonly commodityRepository: ICommodityRepository) {}

  async execute(id: string, userId: string, data: IUpdateCommodityRequestDTO): Promise<IUpdateCommodityResponseDTO> {
    const commodity = await this.validateData(id, userId, data)
    await this.updateCommodity(commodity, data)

    return {
      id: commodity.id,
      name: commodity.name,
      code: commodity.code
    }
  }

  private async validateData(id: string, userId: string, data: IUpdateCommodityRequestDTO) {
    const [nameAlreadyExists, codeAlreadyExists, commodity] = await Promise.all([
      this.commodityRepository.findOne({ name: data.name, userId }),
      this.commodityRepository.findOne({ code: data.code, userId }),
      this.commodityRepository.findOne({ id })
    ])

    if (nameAlreadyExists && nameAlreadyExists.id !== id) throw new Error('Nome de commodity já cadastrado')
    if (codeAlreadyExists && codeAlreadyExists.id !== id) throw new Error('Código de commodity já cadastrado')
    if (!commodity) throw new Error(`Commodity de id = ${id} não encontrado`)

    return commodity
  }

  private async updateCommodity(commodity: Commodity, data: IUpdateCommodityRequestDTO) {
    commodity.update(data.name, data.code)
    const updated = await this.commodityRepository.update(commodity)
    if (!updated) throw new Error('Erro ao atualizar commodity')
  }
}