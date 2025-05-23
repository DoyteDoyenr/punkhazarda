import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/database'
import { ProductsRepository } from '@/repositories/products-repository'

export class PrismaProductRepository implements ProductsRepository {
  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    return product
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  async findAll(page: number) {
    const pageSize = 15
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
    const totalProducts = await prisma.product.count()
    const totalPage = Math.ceil(totalProducts / pageSize)

    return {
      products,
      page,
      totalPage,
    }
  }
}
