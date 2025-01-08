export interface ICreateCommodityRequestDTO {
  name: string
  code: string
  user_id: string
}

export interface ICreateCommodityResponseDTO extends ICreateCommodityRequestDTO {
  id: string
}