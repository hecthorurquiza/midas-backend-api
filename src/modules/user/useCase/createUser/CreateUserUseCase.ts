import { User } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO'
import bcryptjs from 'bcryptjs'

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    await this.validateData(data.email, data.phone)

    const encryptedPassword = bcryptjs.hashSync(data.password, 10)
    const user = await this.userRepository.create(new User({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      password: encryptedPassword
    }))
    if (!user) throw new Error('Erro ao criar usuário')

    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone: user.phone,
    }
  }

  private async validateData(email: string, phone: string) {
    const emailAlreadyExists = await this.userRepository.findOne({ email })
    if (emailAlreadyExists) throw new Error('Email já cadastrado')

    const phoneAlreadyExists = await this.userRepository.findOne({ phone })
    if (phoneAlreadyExists) throw new Error('Telefone já cadastrado')
  }
}