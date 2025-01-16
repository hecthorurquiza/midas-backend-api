export class Commodity {
  public readonly id: string
  public name: string
  public code: string
  public userId: string

  constructor(data: Partial<Commodity>) {
    Object.assign(this, data)
  }

  update(name: string, code: string) {
    this.name = name
    this.code = code
  }
}