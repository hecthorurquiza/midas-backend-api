import { prismaClient } from '~/utils/prismaClient'
import { Site } from '../../entities/Site'
import { IFindOneSite, ISiteRepository } from '../ISiteRepository'

export class SiteRepository implements ISiteRepository {
  async create(data: Site): Promise<Site | null> {
    try {
      const site = await prismaClient.site.create({ data })
      return new Site(site)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findOne(data: IFindOneSite): Promise<Site | null> {
    try {
      const site = await prismaClient.site.findFirst({
        where: {
          OR: [
            { id: data.id },
            { name: data.name },
            { urlAddress: data.urlAddress }
          ]
        }
      })

      if (!site) return null
      return new Site(site)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findManyByUserId(userId: string): Promise<Site[] | null> {
    try {
      const sites = await prismaClient.site.findMany({
        where: { userId }
      })
      return sites.map(site => new Site(site))
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async update(data: Site): Promise<boolean> {
    try {
      await prismaClient.site.update({
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
      await prismaClient.site.delete({ where: { id } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}