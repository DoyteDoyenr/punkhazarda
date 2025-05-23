import request from 'supertest'

import { app } from '@/app'

describe('Fetch Products', () => {
  let token: string

  beforeAll(async () => {
    await request(app).post('/auth/register').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const loginResponse = await request(app).post('/auth/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    token = loginResponse.body.token
  })

  it('should be able to fetch products', async () => {
    const response = await request(app).get('/products').set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      products: expect.any(Array),
      page: expect.any(Number),
      totalPage: expect.any(Number),
    })
  })
})
