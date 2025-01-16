import { Token } from '../entities/Token'

export interface IFindOneToken {
  id?: string
  token?: string
  userId?: string
}

export interface ITokenRepository {
  create(data: Token): Promise<Token | null>
  findOne(data: IFindOneToken): Promise<Token | null>
  findManyByUserId(userId: string): Promise<Token[] | null>
  update(data: Token): Promise<boolean>
  delete(id: string): Promise<boolean>
}