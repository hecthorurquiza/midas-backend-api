import { prismaClient } from '~/utils/prismaClient'
import { Commodity } from '../../entities/Commodity'
import { ICommodityRepository, IFindOneCommodity } from '../ICommodityRepository'

export class CommodityRepository implements ICommodityRepository {
  async create(data: Commodity): Promise<Commodity | null> {
    try {
      const newCommodity = await prismaClient.commodity.create({ data })
      return new Commodity(newCommodity)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findOne(data: IFindOneCommodity): Promise<Commodity | null> {
    try {
      const commodity = await prismaClient.commodity.findFirst({
        where: {
          OR: [
            { id: data.id },
            { code: data.code }
          ]
        }
      })
      if (!commodity) return null
      return new Commodity(commodity)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
}