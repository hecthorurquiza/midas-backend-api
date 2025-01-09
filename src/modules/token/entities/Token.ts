export class Token {
  public readonly id: string
  public token: string
  public userId: string

  constructor(data: Partial<Token>) {
    Object.assign(this, data)
  }
}