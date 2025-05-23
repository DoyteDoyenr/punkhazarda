import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository'

const prisma = new PrismaClient()

async function seedProducts() {
  await prisma.product.deleteMany()

  const prismaProductRepository = new PrismaProductRepository()

  const products = Array.from({ length: 100 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
  }))

  for (const productData of products) {
    await prismaProductRepository.create(productData)
  }

  console.log('Products seeded successfully!')
}

seedProducts()
