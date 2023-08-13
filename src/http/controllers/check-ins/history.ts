import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, replay: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = searchGymsQuerySchema.parse(request.query)

  const searchCheckInsHistory = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await searchCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  })

  return replay.status(200).send({
    checkIns,
  })
}
