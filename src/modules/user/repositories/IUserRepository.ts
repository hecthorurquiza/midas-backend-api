import { User } from '../entities/User'

export interface IFindUser {
  id?: string
  email?: string
  phone?: string
}

export interface IUserRepository {
  create(data: User): Promise<User | null>
  findOne(data: IFindUser): Promise<User | null>
  saveCode(id: string, code: string, expireDate: Date): Promise<boolean>
}