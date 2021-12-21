import { Router } from 'express'

import { loginRoutes } from './loginRoutes/login.routes'

const routes = Router()

routes.use('/login', loginRoutes)

export { routes }
