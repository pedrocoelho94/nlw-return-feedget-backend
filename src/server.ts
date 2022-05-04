import express from 'express'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

// GET, POST, PUT, PATCH, DELETE
// GET = Buscar informações
// POST = Criar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar informações

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
