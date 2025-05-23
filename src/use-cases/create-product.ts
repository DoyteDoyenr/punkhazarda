import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  price: number
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ name, description, price }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productsRepository.create({
      name,
      description,
      price,
    })

    return {
      product,
    }
  }
}
