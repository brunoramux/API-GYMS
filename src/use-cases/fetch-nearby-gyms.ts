import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface fetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface fetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: fetchNearbyGymsUseCaseRequest): Promise<fetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
