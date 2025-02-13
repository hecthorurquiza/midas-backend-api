import { PrismaClient } from '@prisma/client'
import { Commodity } from '../src/modules/commodity/entities/Commodity'
import { Site } from '../src/modules/site/entities/Site'
import { Strategy } from '../src/modules/strategy/entities/Strategy'
import { StrategySite } from '../src/modules/strategy/entities/StrategySite'
import { StrategyToken } from '../src/modules/strategy/entities/StrategyToken'
import { Token } from '../src/modules/token/entities/Token'
import { User } from '../src/modules/user/entities/User'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const users = await createUsers()
  const commodities = await createCommodities(users)
  const tokens = await createTokens(users)
  const sites = await createSites(users)
  await createStrategy(users, commodities, tokens, sites)
}

async function createUsers() {
  const users = [
    new User({
      firstName: 'John',
      lastName: 'Whick',
      email: 'babayaga@mailinator.com',
      phone: '1234567897',
      password: bcryptjs.hashSync('securePassword123', 10)
    }),
    new User({
      firstName: 'Tony',
      lastName: 'Stark',
      email: 'ironman@mailinator.com',
      phone: '9876543210',
      password: bcryptjs.hashSync('jarvis123', 10)
    })
  ]

  const usersDB = Array<User>()

  for (const user of users) {
    const userDB = await prisma.user.create({
      data: user
    })
    usersDB.push(userDB)
  }

  return usersDB
}

async function createCommodities(users: User[]) {
  const commodities = [
    new Commodity({
      name: 'Soja',
      code: 'SOY3',
      userId: users[0].id
    }),
    new Commodity({
      name: 'Café',
      code: 'COF3',
      userId: users[1].id
    })
  ]

  const commoditiesDB = Array<Commodity>()

  for (const commodity of commodities) {
    const commodityDB = await prisma.commodity.create({
      data: commodity
    })
    commoditiesDB.push(new Commodity(commodityDB))
  }

  return commoditiesDB
}

async function createTokens(users: User[]) {
  const tokens = [
    new Token({
      token: 'Aumento do dólar',
      userId: users[0].id
    }),
    new Token({
      token: 'Chuva no Brasil',
      userId: users[1].id
    })
  ]

  const tokensDB = Array<Token>()

  for (const token of tokens) {
    const tokenDB = await prisma.token.create({
      data: token
    })
    tokensDB.push(new Token(tokenDB))
  }

  return tokensDB
}

async function createSites(users: User[]) {
  const sites = [
    new Site({
      name: 'Google news',
      urlAddress: 'https://news.google.com',
      userId: users[0].id
    }),
    new Site({
      name: 'G1',
      urlAddress: 'https://g1.globo.com',
      userId: users[1].id
    })
  ]

  const sitesDB = Array<Site>()

  for (const site of sites) {
    const siteDB = await prisma.site.create({
      data: site
    })
    sitesDB.push(new Site(siteDB))
  }

  return sitesDB
}

async function createStrategy(users: User[], commodities: Commodity[], tokens: Token[], sites: Site[]) {
  const strategies = [
    new Strategy({
      name: 'Estratégia do Jhon',
      userId: users[0].id,
      commodityId: commodities[0].id
    }),
    new Strategy({
      name: 'Estratégia do Tony',
      userId: users[1].id,
      commodityId: commodities[1].id
    })
  ]

  const strategiesDB = Array<Omit<Strategy, 'update' | 'commodity'>>()

  for (const strategy of strategies) {
    const strategyDB = await prisma.strategy.create({
      data: {
        name: strategy.name,
        commodityId: strategy.commodityId,
        userId: strategy.userId
      }
    })
    strategiesDB.push(strategyDB)
  }

  const strategySites = [
    new StrategySite({
      strategyId: strategiesDB[0].id,
      siteId: sites[0].id
    }),
    new StrategySite({
      strategyId: strategiesDB[1].id,
      siteId: sites[1].id
    })
  ]

  for (const strategySite of strategySites) {
    await prisma.strategySite.create({
      data: {
        strategyId: strategySite.strategyId,
        siteId: strategySite.siteId
      }
    })
  }

  const strategyTokens = [
    new StrategyToken({
      strategyId: strategiesDB[0].id,
      tokenId: tokens[0].id
    }),
    new StrategyToken({
      strategyId: strategiesDB[1].id,
      tokenId: tokens[1].id
    })
  ]

  for (const strategyToken of strategyTokens) {
    await prisma.strategyToken.create({
      data: {
        strategyId: strategyToken.strategyId,
        tokenId: strategyToken.tokenId
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })