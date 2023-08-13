import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const useCase = new AuthenticateUseCase(prismaUserRepository)

  return useCase
}
