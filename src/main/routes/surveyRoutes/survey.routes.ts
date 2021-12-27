import { Router } from 'express'
import { AuthorizationMiddlewareExpressAdapter } from '../../../infra/middlewares/express/AuthorizationMiddlewareExpressAdapter'

import { AddSurveyControllerExpressAdapter } from '../../../infra/router/express/AddSurveyControllerExpressAdapter'
import { LoadSurveysConrollerExpressAdapter } from '../../../infra/router/express/LoadSurveysControllerExpressAdapter'

const surveyRoutes = Router()

surveyRoutes.route('/')
  .post(
    AuthorizationMiddlewareExpressAdapter.handle,
    AddSurveyControllerExpressAdapter.handle
  )
  .get(
    AuthorizationMiddlewareExpressAdapter.handle,
    LoadSurveysConrollerExpressAdapter.handle
  )

export { surveyRoutes }
