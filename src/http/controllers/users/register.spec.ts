import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
  })
})
