import nodemailer from 'nodemailer'

interface ISendMailDTO {
  to: string;
  subject: string;
  body: string;
}

export class MailProvider {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD as string,
      }
    })
  }

  async sendMail({ to, subject, body }: ISendMailDTO): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        html: body,
      })
    }
    catch (error: any) {
      console.error('Error sending email:', error.message)
      throw new Error('Failed to send email')
    }
  }
}