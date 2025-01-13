import { prismaClient } from '~/utils/prismaClient'
import { Group } from '../../entities/Group'
import { IFindOneGroup, IGroupRepository } from '../IGroupRepository'

export class GroupRepository implements IGroupRepository{
  async create(data: Group): Promise<Group | null> {
    try {
      const group = await prismaClient.group.create({ data })
      return new Group(group)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findOne(data: IFindOneGroup): Promise<Group | null> {
    try {
      const group = await prismaClient.group.findFirst({
        where: {
          OR: [
            { id: data.id },
            { name: data.name }
          ],
          userId: data.userId
        }
      })

      if (!group) return null
      return new Group(group)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
}