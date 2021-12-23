import { Router } from 'express'

import { AddSurveyControllerExpressAdapter } from '../../../infra/router/express/AddSurveyControllerExpressAdapter'

const surveyRoutes = Router()

surveyRoutes.post('/', AddSurveyControllerExpressAdapter.handle)

export { surveyRoutes }
