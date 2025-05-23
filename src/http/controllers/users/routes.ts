import { Express } from 'express'

import { authenticate } from './authenticate'
import { createAccount } from './create-account'

export function usersRoutes(app: Express) {
  authenticate(app)
  createAccount(app)
}
