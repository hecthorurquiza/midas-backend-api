import { prismaClient } from '~/utils/prismaClient'
import { IGroupUserRepository } from '../IGroupUserRepository'

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
}