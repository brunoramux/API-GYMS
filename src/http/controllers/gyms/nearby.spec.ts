import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'

describe('Fetch Nearby Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby Gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Yeah',
        phone: '1233',
        latitude: -15.7574505,
        longitude: -47.8941105,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym 2',
        description: 'Yeah',
        phone: '1233',
        latitude: -19.7574505,
        longitude: -51.8941105,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -15.7574505,
        longitude: -47.8941105,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(response)
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
  })
})
