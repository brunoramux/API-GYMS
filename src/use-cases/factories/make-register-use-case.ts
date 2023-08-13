import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const registerUserCase = new RegisterUseCase(prismaUserRepository)

  return registerUserCase
}
