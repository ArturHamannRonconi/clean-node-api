import { Request, Response } from 'express'
import { addSurveyControllerFactory } from '../../../main/factories/controllers/AddSurveyControllerFactory'
import { AddSurveyHttpRequestBody } from '../../../presentation/controllers/survey/AddSurveyController/AddSurveyHttpRequestBody'
import { ExpressAdapter } from './ExpressAdapter'

class AddSurveyControllerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    return await ExpressAdapter.transformToExpressRequest<AddSurveyHttpRequestBody>(
      request,
      response,
      addSurveyControllerFactory
    )
  }
}

export { AddSurveyControllerExpressAdapter }
