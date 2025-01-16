import { prismaClient } from '~/utils/prismaClient'
import { Token } from '../../entities/Token'
import { IFindOneToken, ITokenRepository } from '../ITokenRepository'

export class TokenRepository implements ITokenRepository {
  async create(data: Token): Promise<Token | null> {
    try {
      const token = await prismaClient.token.create({ data })
      return new Token(token)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findOne(data: IFindOneToken): Promise<Token | null> {
    try {
      const token = await prismaClient.token.findFirst({
        where: {
          OR: [
            { id: data.id },
            { token: data.token }
          ],
          userId: data.userId
        }
      })

      if (!token) return null
      return new Token(token)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findManyByUserId(userId: string): Promise<Token[] | null> {
    try {
      const tokens = await prismaClient.token.findMany({
        where: { userId }
      })
      return tokens.map(token => new Token(token))
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async update(data: Token): Promise<boolean> {
    try {
      await prismaClient.token.update({
        where: { id: data.id },
        data: { token: data.token }
      })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      await prismaClient.token.delete({ where: { id } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}