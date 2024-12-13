export class User {
  public id: string
  public firstName: string
  public lastName: string
  public email: string
  public phone: string
  public password: string

  constructor(data: Partial<User>) {
    Object.assign(this, data)
  }
}