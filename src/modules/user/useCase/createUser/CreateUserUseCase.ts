import { User } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO'
import bcryptjs from 'bcryptjs'

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const emailAlreadyExists = await this.userRepository.findOne({ email: data.email })
    if (emailAlreadyExists) throw new Error('Email já cadastrado')

    const phoneAlreadyExists = await this.userRepository.findOne({ phone: data.phone })
    if (phoneAlreadyExists) throw new Error('Telefone já cadastrado')

    const encryptedPassword = bcryptjs.hashSync(data.password, 10)
    const user = await this.userRepository.create(new User({ ...data, password: encryptedPassword }))
    if (!user) throw new Error('Erro ao criar usuário')

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as ICreateUserResponseDTO
  }
}