import { Token } from '../entities/Token'

export interface IFindOneToken {
  id?: string
  token?: string
}

export interface ITokenRepository {
  create(data: Token): Promise<Token | null>
  findOne(data: IFindOneToken): Promise<Token | null>
  findManyByUserId(userId: string): Promise<Token[] | null>
}