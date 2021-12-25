import { Router } from 'express'
import { AuthorizationMiddlewareExpressAdapter } from '../../../infra/middlewares/express/AuthorizationMiddlewareExpressAdapter'

import { AddSurveyControllerExpressAdapter } from '../../../infra/router/express/AddSurveyControllerExpressAdapter'

const surveyRoutes = Router()

surveyRoutes.post('/',
  AuthorizationMiddlewareExpressAdapter.handle,
  AddSurveyControllerExpressAdapter.handle
)

export { surveyRoutes }
