import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'bruno.lemos@live.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
