import { SiteRepository } from '../../repositories/implementations/SiteRepository'
import { UpdateSiteController } from './UpdateSiteController'
import { UpdateSiteUseCase } from './UpdateSiteUseCase'

const siteRepository = new SiteRepository()
const updateSiteUseCase = new UpdateSiteUseCase(siteRepository)
const updateSiteController = new UpdateSiteController(updateSiteUseCase)

export { updateSiteController }