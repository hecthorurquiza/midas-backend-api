export interface ICreateStrategyRequestDTO {
  name: string
  commodity_id: string
  user_id: string
  sites_ids: string[]
  tokens_ids: string[]
}

export interface ICreateStrategyResponseDTO {
  id: string
  name: string
  commodity_id: string
}