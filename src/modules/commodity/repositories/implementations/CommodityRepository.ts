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
            { name: data.name },
            { code: data.code }
          ],
          userId: data.userId
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
  async findManyByUserId(userId: string): Promise<Commodity[] | null> {
    try {
      const commodities = await prismaClient.commodity.findMany({
        where: { userId }
      })
      return commodities.map(commodity => new Commodity(commodity))
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async update(data: Commodity): Promise<boolean> {
    try {
      await prismaClient.commodity.update({
        where: { id: data.id },
        data
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
      await prismaClient.commodity.delete({ where: { id } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}