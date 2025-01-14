import { prismaClient } from '~/utils/prismaClient'
import { User } from '../../entities/User'
import { IFindUser, IUserRepository } from '../IUserRepository'

export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User | null> {
    try {
      const user = await prismaClient.user.create({ data })
      return user
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findOne(data: IFindUser): Promise<User | null> {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          OR: [
            { id: data.id },
            { email: data.email },
            { phone: data.phone }
          ]
        }
      })
      return user ? new User(user) : null
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async saveCode(id: string, code: string, expireDate: Date): Promise<boolean> {
    try {
      await prismaClient.user.update({
        where: { id },
        data: { code, expireIn: expireDate }
      })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}