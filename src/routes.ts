import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'

export const routes = express.Router()

// const transport = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// })

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  // const feedback = await prisma.feedback.create({
  //   data: {
  //     type,
  //     comment,
  //     screenshot
  //   }
  // })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <help@feedget.com>',
  //   to: 'Pedro Coelho <pedrohenriquesc@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`
  //   ].join('\n')
  // })

  return res.status(201).send()
})
