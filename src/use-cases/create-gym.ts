import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {} // vai receber uma instancia do repositorio responsavel pela conexao ao banco. Essa e a maneira mais simples de fazer o codigo acima.

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const data = {
      title,
      description,
      phone,
      latitude,
      longitude,
    }

    const gym = await this.gymsRepository.create(data)

    return {
      gym,
    }
  }
}
