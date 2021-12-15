import { Router } from 'express'
import { bodyParser } from './BodyParser/BodyParser'

const appMiddlewares = Router()

appMiddlewares.use(bodyParser)

export { appMiddlewares }
