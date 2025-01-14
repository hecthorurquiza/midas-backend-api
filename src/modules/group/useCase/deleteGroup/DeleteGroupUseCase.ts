import { IGroupRepository } from '../../repositories/IGroupRepository'

export class DeleteGroupUseCase {
  constructor(private readonly groupRepository: IGroupRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const group = await this.groupRepository.findOne({ id })
    if (!group) throw new Error(`Grupo de id = ${id} não encontrado`)
    if (group.userId !== userId) throw new Error('Usuário não tem permissão para deletar este grupo')

    const deleted = await this.groupRepository.delete(group.id)
    if (!deleted) throw new Error('Erro ao deletar grupo')
  }
}