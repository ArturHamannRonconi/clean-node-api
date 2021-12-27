import { Router } from 'express'

import { loginRoutes } from './loginRoutes/login.routes'
import { surveyRoutes } from './surveyRoutes/survey.routes'

const routes = Router()

routes.use('/login', loginRoutes)
routes.use('/survey', surveyRoutes)

export { routes }
