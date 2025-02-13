export interface IGetStrategyResponseDTO {
  id: string
  name: string
  commodity_id: string
  sites: ISite[]
  tokens: IToken[]
}

interface ISite {
  id: string
  name: string
  url: string
}

interface IToken {
  id: string
  token: string
}