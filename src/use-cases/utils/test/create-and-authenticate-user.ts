import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'Bruno Ramos lemos',
      email: 'brunolemos@bb.com.br',
      password_hash: await hash('927273490', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'brunolemos@bb.com.br',
    password: '927273490',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
