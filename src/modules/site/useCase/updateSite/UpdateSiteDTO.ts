import { ICreateSiteResponseDTO } from '../createSite/CreateSiteDTO'

export interface IUpdateSiteRequestDTO {
  name: string
  url_address: string
}

export type IUpdateSiteResponseDTO = ICreateSiteResponseDTO