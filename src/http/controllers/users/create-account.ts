import { Express } from 'express'
import validate from 'express-zod-safe'
import { z } from 'zod'

import { catchAsync } from '@/lib/catch-async'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export function createAccount(app: Express) {
  app.post(
    '/auth/register',
    validate({
      body: {
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
      },
    }),
    catchAsync(async (req, res) => {
      const { email, password } = req.body
      const registerUseCase = makeRegisterUseCase()

      await registerUseCase.execute({
        email,
        password,
      })

      res.status(201).send()
    }),
  )
}
