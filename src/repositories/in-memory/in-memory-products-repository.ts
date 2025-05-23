import { randomUUID } from 'node:crypto'

import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findById(id: string) {
    const product = this.items.find((item) => item.id === id)

    if (!product) {
      return null
    }

    return product
  }

  async findByName(name: string) {
    const product = this.items.find((item) => item.name === name)

    if (!product) {
      return null
    }

    return product
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(product)

    return product
  }

  async findAll(page: number): Promise<{ products: Product[]; page: number; totalPage: number }> {
    const totalProducts = this.items.length
    const totalPage = Math.ceil(totalProducts / 10)
    const products = this.items.slice((page - 1) * 10, page * 10)

    return {
      products,
      page,
      totalPage,
    }
  }
}
