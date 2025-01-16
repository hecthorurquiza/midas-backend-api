export interface ICreateTokenRequestDTO {
  token: string
  user_id: string
}

export interface ICreateTokenResponseDTO extends ICreateTokenRequestDTO {
  id: string
}