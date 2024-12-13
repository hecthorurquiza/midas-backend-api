export interface ICreateUserRequestDTO {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export interface ICreateUserResponseDTO extends ICreateUserRequestDTO {
  id: string
}