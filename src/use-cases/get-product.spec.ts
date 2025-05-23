import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from '@/use-cases/create-product'
import { GetProductUseCase } from '@/use-cases/get-product'

let productsRepository: InMemoryProductsRepository
let createProductSut: CreateProductUseCase
let fetchProductSut: GetProductUseCase

describe('Fetch Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    createProductSut = new CreateProductUseCase(productsRepository)
    fetchProductSut = new GetProductUseCase(productsRepository)
  })

  it('should return a single product', async () => {
    const productData = {
      name: 'Product A',
      description: 'Description of Product A',
      price: 100,
    }

    const { product } = await fetchProductSut.execute((await createProductSut.execute(productData)).product.id)

    expect(product).toBeDefined()
    expect(product).toMatchObject({ name: 'Product A' })
  })
})
