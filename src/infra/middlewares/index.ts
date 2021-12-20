import { Router } from 'express'
import { bodyParser } from './BodyParser/BodyParser'
import { cors } from './cors/Cors'

const appMiddlewares = Router()

appMiddlewares.use(bodyParser)
appMiddlewares.use(cors)

export { appMiddlewares }
