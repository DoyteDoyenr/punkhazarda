import { Express } from 'express'
import validate from 'express-zod-safe'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

import { catchAsync } from '@/lib/catch-async'
import { env } from '@/lib/env'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export function authenticate(app: Express) {
  app.post(
    '/auth/login',
    validate({
      body: {
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
      },
    }),
    catchAsync(async (req, res) => {
      const { email, password } = req.body
      const authenticateUseCase = makeAuthenticateUseCase()

      const { user } = await authenticateUseCase.execute({
        email,
        password,
      })

      const token = sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '1h' })

      res.status(200).send({ token })
    }),
  )
}
