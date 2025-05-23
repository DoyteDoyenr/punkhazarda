import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository'

import { GetProductUseCase } from '../get-product'

export function makeGetProductUseCase() {
  const productsRepository = new PrismaProductRepository()
  const getProductUseCase = new GetProductUseCase(productsRepository)

  return getProductUseCase
}
