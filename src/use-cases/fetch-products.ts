import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

interface FetchProductsUseCaseRequest {
  page: number
}

interface FetchProductsUseCaseResponse {
  products: Product[]
  page: number
  totalPage: number
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ page }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const productResponse = await this.productsRepository.findAll(page)

    return productResponse
  }
}
