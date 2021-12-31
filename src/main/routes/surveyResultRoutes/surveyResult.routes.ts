import { Router } from 'express'
import { AuthorizationMiddlewareExpressAdapter } from '../../../infra/middlewares/express/AuthorizationMiddlewareExpressAdapter'

import { AddSurveyResultControllerExpressAdapter } from '../../../infra/router/express/AddSurveyResultControllerExpressAdapter'

const surveyResultsRoutes = Router()

surveyResultsRoutes.route('/')
  .post(
    AuthorizationMiddlewareExpressAdapter.handle,
    AddSurveyResultControllerExpressAdapter.handle
  )

export { surveyResultsRoutes }
