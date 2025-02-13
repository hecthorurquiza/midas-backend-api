import { SiteRepository } from '../../repositories/implementations/SiteRepository'
import { GetSiteController } from './GetSiteController'
import { GetSiteUseCase } from './GetSiteUseCase'

const siteRepository = new SiteRepository()
const getSiteUseCase = new GetSiteUseCase(siteRepository)
const getSiteController = new GetSiteController(getSiteUseCase)

export { getSiteController }