import request from 'supertest'

import { app } from '@/app'
import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository'
import { CreateProductUseCase } from '@/use-cases/create-product'

let productsRepository: PrismaProductRepository
let createProductUseCase: CreateProductUseCase
let token: string

describe('Get Product', () => {
  beforeEach(() => {
    productsRepository = new PrismaProductRepository()
    createProductUseCase = new CreateProductUseCase(productsRepository)
  })

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

  it('should be able to create and then retrieve a product by id', async () => {
    const {
      product: { id: productId },
    } = await createProductUseCase.execute({
      name: 'Product A',
      description: 'Description of Product A',
      price: 100,
    })

    const response = await request(app).get(`/products/${productId}`).set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      product: expect.objectContaining({
        id: productId,
        name: 'Product A',
        description: 'Description of Product A',
        price: 100,
      }),
    })
  })

  it('should return 404 when trying to retrieve a non-existing product', async () => {
    const response = await request(app).get('/products/non-existing-id').set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(404)
    expect(response.body).toEqual({
      message: 'Resource not found.',
    })
  })
})
