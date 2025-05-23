import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository'

import { FetchProductsUseCase } from '../fetch-products'

export function makeFetchProductsUseCase() {
  const productsRepository = new PrismaProductRepository()
  const fetchProductsUseCase = new FetchProductsUseCase(productsRepository)

  return fetchProductsUseCase
}
