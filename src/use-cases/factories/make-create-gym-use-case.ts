import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const prismaGymUseCase = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(prismaGymUseCase)

  return useCase
}
