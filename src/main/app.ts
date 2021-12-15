import express from 'express'
import { appMiddlewares } from './middlewares'

const app = express()

app.use(appMiddlewares)

export { app }
