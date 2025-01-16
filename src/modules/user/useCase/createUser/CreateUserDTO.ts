export interface ICreateUserRequestDTO {
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
}

export interface ICreateUserResponseDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
}