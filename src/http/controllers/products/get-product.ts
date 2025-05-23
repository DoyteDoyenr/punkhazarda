import { Express } from 'express'
import validate from 'express-zod-safe'
import { z } from 'zod'

import { verifyAuthToken } from '@/http/middlewares/verify-jwt'
import { catchAsync } from '@/lib/catch-async'
import { makeGetProductUseCase } from '@/use-cases/factories/make-get-product-use.case'

export function getProduct(app: Express) {
  app.get(
    '/products/:id',
    verifyAuthToken,
    validate({
      params: {
        id: z.string(),
      },
    }),
    catchAsync(async (req, res) => {
      const { id } = req.params

      const getProductUseCase = makeGetProductUseCase()

      const { product } = await getProductUseCase.execute(id)

      res.status(200).send({ product })
    }),
  )
}
