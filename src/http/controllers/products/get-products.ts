import { Express } from 'express'
import validate from 'express-zod-safe'
import { z } from 'zod'

import { verifyAuthToken } from '@/http/middlewares/verify-jwt'
import { catchAsync } from '@/lib/catch-async'
import { makeFetchProductsUseCase } from '@/use-cases/factories/make-fetch-products-use.case copy'

export function getProducts(app: Express) {
  app.get(
    '/products',
    verifyAuthToken,
    validate({
      query: {
        page: z.string().default('1'),
      },
    }),
    catchAsync(async (req, res) => {
      const { page } = req.query

      const fetchProductsUseCase = makeFetchProductsUseCase()

      const productResponse = await fetchProductsUseCase.execute({ page: Number(page) })

      res.status(200).send(productResponse)
    }),
  )
}
