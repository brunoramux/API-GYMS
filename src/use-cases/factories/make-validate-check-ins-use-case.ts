import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-ins'

export function makeValidateCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

  return useCase
}
