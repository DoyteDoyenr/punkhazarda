import request from 'supertest'

import { app } from '@/app'

describe('Authenticate', () => {
  it('should be able to authenticate an existing user', async () => {
    await request(app).post('/auth/register').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app).post('/auth/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })

  it('should return 401 when trying to log in with a non-existing user', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'nonexistent@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(401)
    expect(response.body).toEqual({
      message: 'Invalid credentials.',
    })
  })
})
