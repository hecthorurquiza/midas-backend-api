export interface ILoginUserRequestDTO {
  email: string
  password: string
}

export interface ILoginUserResponseDTO {
  token: string
  user_id: string
  user_email: string
}
