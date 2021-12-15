import express from 'express'

import { appMiddlewares } from './middlewares'
import { routes } from './routes'

const app = express()

app.use(appMiddlewares)
app.use('/api/v1', routes)

export { app }
