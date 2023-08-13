import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { User } from '@prisma/client'

interface userData {
  name: string
  email: string
  password_hash: string
}

export class PrismaUserRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      // valida se o email ja existe
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      // valida se o email ja existe
      where: {
        email,
      },
    })

    return user
  }

  async create(data: userData) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
