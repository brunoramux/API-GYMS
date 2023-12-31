import { makeSerchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, replay: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymUseCase = makeSerchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page,
  })

  return replay.status(200).send({
    gyms,
  })
}
