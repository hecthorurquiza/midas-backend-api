import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { IGroupUserRepository } from '../../repositories/IGroupUserRepository'
import { IGetUserGroupsResponseDTO } from './GetUserGroupsDTO'
import { GroupUser } from '../../entities/GroupUser'

export class GetUserGroupsUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly groupUserRepository: IGroupUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserGroupsResponseDTO> {
    const groupsUser = await this.validateData(userId)
    const groupsMapped = this.mapGroups(groupsUser)

    return { groups: groupsMapped }
  }

  private async validateData(userId: string) {
    const user = await this.userRepository.findOne({ id: userId })
    if (!user) throw new Error(`Usuário de id = ${userId} não encontrado`)

    const groupsUser = await this.groupUserRepository.findManyByUserId(userId)
    if (!groupsUser) throw new Error('Erro ao buscar grupos do usuário')

    return groupsUser
  }

  private mapGroups(groupsUser: GroupUser[]) {
    return groupsUser.map(groupUser => ({
      id: groupUser.groupId,
      name: groupUser.group.name,
    }))
  }
}