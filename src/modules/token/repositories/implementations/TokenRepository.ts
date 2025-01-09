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
          ]
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
}