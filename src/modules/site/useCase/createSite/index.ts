import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { CreateSiteUseCase } from './CreateSiteUseCase'
import { CreateSiteController } from './CreateSiteController'
import { SiteRepository } from '../../repositories/implementations/SiteRepository'

const siteRepository = new SiteRepository()
const userRepository = new UserRepository()
const createSiteUseCase = new CreateSiteUseCase(siteRepository, userRepository)
const createSiteController = new CreateSiteController(createSiteUseCase)

export { createSiteController }