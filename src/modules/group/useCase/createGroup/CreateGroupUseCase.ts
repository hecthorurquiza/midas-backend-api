import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { IGroupRepository } from '../../repositories/IGroupRepository'
import { IGroupUserRepository } from '../../repositories/IGroupUserRepository'
import { ICreateGroupRequestDTO, ICreateGroupResponseDTO } from './CreateGroupDTO'
import { Group } from '../../entities/Group'

export class CreateGroupUseCase {
  constructor(
    private readonly groupRepository: IGroupRepository,
    private readonly groupUserRepository: IGroupUserRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: ICreateGroupRequestDTO): Promise<ICreateGroupResponseDTO> {
    await this.validateData(data)
    const group = await this.createGroup(data)

    return {
      id: group.id,
      name: group.name,
      user_id: group.userId
    }
  }

  private async validateData(data: ICreateGroupRequestDTO) {
    const user = await this.userRepository.findOne({ id: data.user_id })
    if (!user) throw new Error(`Usuário de id = ${data.user_id} não encontrado`)

    const nameAlreadyExists = await this.groupRepository.findOne({ name: data.name, userId: data.user_id })
    if (nameAlreadyExists) throw new Error('Nome já registrado')
  }

  private async createGroup(data: ICreateGroupRequestDTO) {
    const group = await this.groupRepository.create(
      new Group({
        name: data.name,
        userId: data.user_id
      })
    )
    if (!group) throw new Error('Erro ao criar grupo')

    const created = await this.groupUserRepository.create(group.id, data.user_id)
    if (!created) throw new Error('Erro ao adicionar usuário ao grupo')

    return group
  }
}