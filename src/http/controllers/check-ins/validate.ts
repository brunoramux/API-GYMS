import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInQuerySchema = z.object({
    checkInId: z.coerce.string().uuid(),
  })

  const { checkInId } = validateCheckInQuerySchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInsUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
