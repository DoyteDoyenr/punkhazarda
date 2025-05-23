import request from 'supertest'

import { app } from '@/app'

describe('Register', () => {
  it('should be able to register', async () => {
    const { statusCode } = await request(app).post('/auth/register').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(statusCode).toEqual(201)
  })

  it('should not allow registering with the same email', async () => {
    const { statusCode, body } = await request(app).post('/auth/register').send({
      email: 'johndoe@example.com',
      password: '654321',
    })

    expect(statusCode).toEqual(409)
    expect(body).toEqual({ message: 'E-mail already exists.' })
  })
})
