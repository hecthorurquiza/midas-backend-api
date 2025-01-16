import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { Commodity } from '../../entities/Commodity'
import { ICommodityRepository } from '../../repositories/ICommodityRepository'
import { ICreateCommodityRequestDTO, ICreateCommodityResponseDTO } from './CreateCommodityDTO'

export class CreateCommodityUseCase {
  constructor(
    private commodityRepository: ICommodityRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateCommodityRequestDTO): Promise<ICreateCommodityResponseDTO> {
    await this.validateData(data.code, data.user_id)

    const commodity = await this.commodityRepository.create(
      new Commodity({
        name: data.name,
        code: data.code,
        userId: data.user_id
      })
    )
    if (!commodity) throw new Error('Erro ao cadastrar commodity')

    return {
      id: commodity.id,
      name: commodity.name,
      code: commodity.code,
      user_id: commodity.userId
    }
  }

  private async validateData(code: string, userId: string) {
    const [codeAlreadyExists, user] = await Promise.all([
      this.commodityRepository.findOne({ code, userId }),
      this.userRepository.findOne({ id: userId })
    ])

    if (codeAlreadyExists) throw new Error('Código de commodity já cadastrado')
    if (!user) throw new Error('Usuário não encontrado')
  }
}