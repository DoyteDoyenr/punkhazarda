import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProductUseCaseResponse {
  product: Product | null
}

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return {
      product,
    }
  }
}
