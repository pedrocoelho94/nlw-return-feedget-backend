import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer, { Transporter } from 'nodemailer'

export class NodemailerMailAdapter implements MailAdapter {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  transport: Transporter

  async sendMail({ subject, body }: SendMailData) {
    await this.transport.sendMail({
      from: 'Equipe Feedget <help@feedget.com>',
      to: 'Pedro Coelho <pedrohenriquesc@gmail.com>',
      subject: subject,
      html: body
    })
  }
}
