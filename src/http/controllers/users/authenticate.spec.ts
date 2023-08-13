import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'bruno.lemos@live.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
