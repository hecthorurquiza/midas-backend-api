export interface IUpdateCommodityRequestDTO {
  name: string
  code: string
}

export interface IUpdateCommodityResponseDTO extends IUpdateCommodityRequestDTO {
  id: string
}