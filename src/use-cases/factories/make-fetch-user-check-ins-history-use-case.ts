import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInUseCase = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInUseCase)

  return useCase
}
