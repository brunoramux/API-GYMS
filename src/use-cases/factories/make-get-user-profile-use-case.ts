import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userUseCase = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(userUseCase)

  return useCase
}
