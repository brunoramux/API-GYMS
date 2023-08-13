import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInUseCase = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInUseCase)

  return useCase
}
