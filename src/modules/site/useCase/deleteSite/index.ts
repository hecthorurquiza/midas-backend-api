import { SiteRepository } from '../../repositories/implementations/SiteRepository'
import { DeleteSiteController } from './DeleteSiteController'
import { DeleteSiteUseCase } from './DeleteSiteUseCase'

const siteRepository = new SiteRepository()
const deleteSiteUseCase = new DeleteSiteUseCase(siteRepository)
const deleteSiteController = new DeleteSiteController(deleteSiteUseCase)

export { deleteSiteController }