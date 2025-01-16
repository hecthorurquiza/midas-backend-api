import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { MailProvider } from '~/provider/MailProvider'
import { getDatePlus5Minutes } from '~/utils/getDate'
import ejs from 'ejs'
import path from 'path'

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailProvider: MailProvider
  ) {}

  async execute(email: string) {
    const user = await this.validateUser(email)
    const name = user.firstName
    const code = Math.floor(1000 + Math.random() * 9000)
    const expireDate = getDatePlus5Minutes()
    const templatePath = path.resolve(__dirname, '../../../../', 'views', 'forgotPasswordTemplate.ejs')

    await this.saveCode(user.id, code.toString(), expireDate)

    try {
      // Render the email template
      const data = await ejs.renderFile(templatePath, { name, code })

      // Send email
      await this.mailProvider.sendMail({
        to: user.email,
        subject: 'Código de recuperação de senha',
        body: data
      })
    }
    catch (error: any) {
      console.error(error.message)
      throw new Error('Erro ao enviar email')
    }
  }

  private async validateUser(email: string) {
    const user = await this.userRepository.findOne({ email })
    if (!user) throw new Error('Email não encontrado na base de dados')
    return user
  }

  private async saveCode(userId: string, code: string, expireDate: Date) {
    const saved = await this.userRepository.saveCode(userId, code, expireDate)
    if (!saved) throw new Error('Erro ao salvar código de recuperação')
  }
}