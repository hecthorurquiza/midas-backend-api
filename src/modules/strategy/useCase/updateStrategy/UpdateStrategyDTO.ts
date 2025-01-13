import { ICreateStrategyResponseDTO } from '../createStrategy/CreateStrategyDTO'

export interface IUpdateStrategyRequestDTO {
  name: string
  commodity_id: string
  sites_ids: string[]
  tokens_ids: string[]
}

export type IUpdateStrategyResponseDTO = ICreateStrategyResponseDTO