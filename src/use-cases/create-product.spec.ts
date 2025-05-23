import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from '@/use-cases/create-product'

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository)
  })

  it('should be able to create a product', async () => {
    const { product } = await sut.execute({
      name: 'Product A',
      description: 'Description of Product A',
      price: 100,
    })

    expect(product.id).toEqual(expect.any(String))
    expect(product.name).toBe('Product A')
  })
})
