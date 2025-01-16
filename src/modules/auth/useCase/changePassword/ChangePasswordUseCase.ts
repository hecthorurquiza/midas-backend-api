import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { IChangePasswordRequestDTO } from './ChangePasswordDTO'
import bcryptjs from 'bcryptjs'

export class ChangePasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: IChangePasswordRequestDTO): Promise<void> {
    await this.validateData(data)
    await this.saveNewPassword(data)
  }

  private async validateData({ email, new_password }: IChangePasswordRequestDTO) {
    const user = await this.userRepository.findOne({ email })
    if (!user) throw new Error('Email não encontrado na base de dados')

    const isEqualOldPassword = bcryptjs.compareSync(new_password, user.password)
    if (isEqualOldPassword) throw new Error('A nova senha não pode ser igual a antiga')
  }

  private async saveNewPassword({ email, new_password }: IChangePasswordRequestDTO) {
    const encryptedPassword = bcryptjs.hashSync(new_password, 10)
    const saved = await this.userRepository.changePassword(email, encryptedPassword)
    if (!saved) throw new Error('Erro ao salvar nova senha')
  }
}