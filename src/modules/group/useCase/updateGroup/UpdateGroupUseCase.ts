import { Group } from '../../entities/Group'
import { IGroupRepository } from '../../repositories/IGroupRepository'
import { IUpdateGroupResponseDTO } from './UpdateGroupDTO'

export class UpdateGroupUseCase {
  constructor(private readonly groupRepository: IGroupRepository) {}

  async execute(groupId: string, name: string, userId: string): Promise<IUpdateGroupResponseDTO> {
    const group = await this.validateData(groupId, name, userId)
    await this.updateGroup(group, name)

    return {
      id: group.id,
      name: group.name,
      user_id: group.userId
    }
  }

  private async validateData(groupId: string, name: string, userId: string) {
    const [group, nameAlreadyExists] = await Promise.all([
      this.groupRepository.findOne({ id: groupId }),
      this.groupRepository.findOne({ name, userId })
    ])

    if (!group) throw new Error(`Grupo de id = ${groupId} não encontrado`)
    if (nameAlreadyExists && nameAlreadyExists.id !== groupId) throw new Error('Nome já registrado')

    return group
  }

  private async updateGroup(group: Group, name: string) {
    group.update(name)
    const updated = await this.groupRepository.update(group)
    if (!updated) throw new Error('Erro ao atualizar grupo')
  }
}