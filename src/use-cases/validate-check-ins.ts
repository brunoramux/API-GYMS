import { CheckInRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-checkin-validation-error'

interface ValidadeCheckInUseCaseRequest {
  checkInId: string
}

interface ValidadeCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidadeCheckInUseCaseRequest): Promise<ValidadeCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
