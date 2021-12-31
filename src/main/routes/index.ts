import { Router } from 'express'

import { loginRoutes } from './loginRoutes/login.routes'
import { surveyResultsRoutes } from './surveyResultRoutes/surveyResult.routes'
import { surveyRoutes } from './surveyRoutes/survey.routes'

const routes = Router()

routes.use('/login', loginRoutes)
routes.use('/survey', surveyRoutes)
routes.use('/survey-result', surveyResultsRoutes)

export { routes }
