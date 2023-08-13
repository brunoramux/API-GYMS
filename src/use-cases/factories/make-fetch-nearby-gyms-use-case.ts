import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymUseCase = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(prismaGymUseCase)

  return useCase
}
