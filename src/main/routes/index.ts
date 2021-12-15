import { Router } from 'express'

import { signUpRoutes } from './signUpRoutes/signUp.routes'

const routes = Router()

routes.use(signUpRoutes)

export { routes }
