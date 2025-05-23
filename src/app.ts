import cors from 'cors'
import express, { NextFunction } from 'express'

import { productRoutes } from './http/controllers/products/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { errorHandler } from './http/middlewares/error-handler'

export const app = express()

app.use(express.json())

const corsOptions = {
  origin: '*',
  credentials: true,
}

app.use(cors(corsOptions))

// Product Routes
productRoutes(app)

// Users Routes
usersRoutes(app)

// Use errorHandler as middleware
app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  errorHandler(err, req, res, next)
})
