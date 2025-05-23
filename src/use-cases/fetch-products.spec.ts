import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from '@/use-cases/create-product'
import { FetchProductsUseCase } from '@/use-cases/fetch-products'

let productsRepository: InMemoryProductsRepository
let createProductSut: CreateProductUseCase
let fetchProductsSut: FetchProductsUseCase

describe('Fetch Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    createProductSut = new CreateProductUseCase(productsRepository)
    fetchProductsSut = new FetchProductsUseCase(productsRepository)
  })

  it('should return a list of products', async () => {
    const productsToCreate = [
      {
        name: 'Product A',
        description: 'Description of Product A',
        price: 100,
      },
      {
        name: 'Product B',
        description: 'Description of Product B',
        price: 200,
      },
      {
        name: 'Product C',
        description: 'Description of Product C',
        price: 300,
      },
      {
        name: 'Product D',
        description: 'Description of Product D',
        price: 400,
      },
      {
        name: 'Product E',
        description: 'Description of Product E',
        price: 500,
      },
    ]

    for (const productData of productsToCreate) {
      await createProductSut.execute(productData)
    }

    const { products } = await fetchProductsSut.execute({ page: 1 })

    expect(products).toHaveLength(5)
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Product A' }),
        expect.objectContaining({ name: 'Product B' }),
        expect.objectContaining({ name: 'Product C' }),
        expect.objectContaining({ name: 'Product D' }),
        expect.objectContaining({ name: 'Product E' }),
      ]),
    )
  })
})
