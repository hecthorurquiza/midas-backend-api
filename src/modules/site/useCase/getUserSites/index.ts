import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { SiteRepository } from '../../repositories/implementations/SiteRepository'
import { GetUserSitesUseCase } from './GetUserSitesUseCase'
import { GetUserSitesController } from './GetUserSitesController'

const siteRepository = new SiteRepository()
const userRepository = new UserRepository()
const getUserSitesUseCase = new GetUserSitesUseCase(siteRepository, userRepository)
const getUserSitesController = new GetUserSitesController(getUserSitesUseCase)

export { getUserSitesController }