import { CheckInUseCase } from '../checkin'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const checkInUserRepository = new PrismaCheckInsRepository()
  const prismaGymUseCase = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInUserRepository, prismaGymUseCase)

  return useCase
}
