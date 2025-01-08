export interface ICreateSiteRequestDTO {
  name: string
  url_address: string
  user_id: string
}

export interface ICreateSiteResponseDTO extends ICreateSiteRequestDTO {
  id: string
}