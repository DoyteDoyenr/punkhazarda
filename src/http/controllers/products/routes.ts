import { Express } from 'express'

import { getProduct } from './get-product'
import { getProducts } from './get-products'

export function productRoutes(app: Express) {
  getProducts(app)
  getProduct(app)
}
