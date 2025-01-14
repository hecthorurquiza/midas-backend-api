import { prismaClient } from '~/utils/prismaClient'
import { IGroupUserRepository } from '../IGroupUserRepository'
import { GroupUser } from '../../entities/GroupUser'
import { Group } from '../../entities/Group'

export class GroupUserRepository implements IGroupUserRepository {
  async create(groupId: string, userId: string): Promise<boolean> {
    try {
      await prismaClient.groupUser.create({
        data: {
          groupId,
          userId
        }
      })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
  async findManyByUserId(userId: string): Promise<GroupUser[] | null> {
    try {
      const groupUsers = await prismaClient.groupUser.findMany({
        where: { userId },
        include: { group: true }
      })
      return groupUsers.map(groupUser => new GroupUser({
        ...groupUser,
        group: new Group(groupUser.group)
      }))
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
}