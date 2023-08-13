import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createGymBodySchema.parse(request.query)

  const searchNearbyGyms = makeFetchNearbyGymsUseCase()

  const { gyms } = await searchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
