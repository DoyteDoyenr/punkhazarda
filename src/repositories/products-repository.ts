import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>
  create(data: Prisma.ProductCreateInput): Promise<Product>
  findAll(page: number): Promise<{
    products: Product[]
    page: number
    totalPage: number
  }>
}
